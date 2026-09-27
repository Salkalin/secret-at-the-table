import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import fastifyStatic from '@fastify/static';
import { Server } from 'socket.io';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { prisma } from './db.js';
import * as A from './auth.js';
import { routes } from './routes.js';
import { attachSocket } from './socket.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3000);

async function bootstrap() {
  // seed: первый админ
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPass = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPass) {
    const exists = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!exists) {
      await prisma.user.create({
        data: { email: adminEmail, password: await A.hashPassword(adminPass), role: 'ADMIN' }
      });
      console.log('[seed] admin created:', adminEmail);
    }
  }

  const app = Fastify({ logger: true });

  // Socket.IO цепляем к уже существующему серверу Fastify
  const io = new Server(app.server, { cors: { origin: true, credentials: true } });
  attachSocket(io);

  await app.register(cookie);
  await app.register(routes);

  const webRoot = path.join(__dirname, '../web');
  await app.register(fastifyStatic, { root: webRoot, prefix: '/' });

  app.setNotFoundHandler((req, reply) => {
    if (req.raw.url?.startsWith('/api')) return reply.code(404).send({ error: 'not_found' });
    reply.sendFile('index.html');
  });

  await app.listen({ port: PORT, host: '0.0.0.0' });
  console.log('▶ http://0.0.0.0:' + PORT);
}

bootstrap().catch(e => {
  console.error(e);
  process.exit(1);
});
