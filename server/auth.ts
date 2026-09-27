import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'dev-secret';
const COOKIE = 'mt_token';

export type JwtPayload = { uid: string; role: 'ADMIN' | 'HOST' };

export const hashPassword = (pw: string) => argon2.hash(pw);
export const verifyPassword = (hash: string, pw: string) => argon2.verify(hash, pw);

export const signToken = (payload: JwtPayload) =>
  jwt.sign(payload, SECRET, { expiresIn: '30d' });

export const verifyToken = (token: string): JwtPayload | null => {
  try { return jwt.verify(token, SECRET) as JwtPayload; } catch { return null; }
};

export const setAuthCookie = (reply: any, token: string) => {
  reply.setCookie(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30
  });
};

export const clearAuthCookie = (reply: any) =>
  reply.clearCookie(COOKIE, { path: '/' });

export const getAuthFromCookie = (req: any): JwtPayload | null => {
  const t = req.cookies?.[COOKIE];
  return t ? verifyToken(t) : null;
};

export const requireRole = (req: any, reply: any, role: 'ADMIN' | 'HOST') => {
  const auth = getAuthFromCookie(req);
  if (!auth || (role === 'ADMIN' && auth.role !== 'ADMIN')) {
    reply.code(401).send({ error: 'unauthorized' });
    return null;
  }
  return auth;
};
