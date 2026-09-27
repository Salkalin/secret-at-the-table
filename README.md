# Тайна за столом

Мультиплеерная детективная игра для кафе, баров и корпоративов. Ведущий запускает сессию на большом экране, гости сканируют QR со своих телефонов и играют командами за столами. Побеждает команда, которая быстрее и точнее назовёт убийцу.

---

## Что внутри

- **Backend:** Node.js 22 + Fastify 5 + Socket.IO
- **БД:** PostgreSQL 16 + Prisma ORM
- **Frontend:** React 18 + Vite + TypeScript + Tailwind
- **Деплой:** Docker + Caddy (авто-HTTPS)
- **Озвучка:** браузерный SpeechSynthesis (без внешних сервисов)
- **Эффект:** дождь на canvas + градиентный фон

### Роли

- **admin** — владелец. Создаёт и блокирует ведущих.
- **host** — ведущий. Создаёт игровые сессии, управляет ходом игры.
- **player** — гость. Капитан команды (первый нажавший «Я капитан») голосует за стол. Остальные — зрители.

### Правила

- Раундов: **3**, по главе на раунд.
- Время на обсуждение: **10 минут** на раунд.
- Голосует **только капитан** команды, со своего телефона.
- Правильный ответ: **+500** очков команде.
- Неправильный: **−200** очков.

---

## Быстрый старт (локально, для разработки)

### Требования

- Node.js 20+ (рекомендуется 22)
- Docker Desktop (для локальной БД)
- Git

### Шаги

```bash
# 1. Клонировать
git clone <URL_ВАШЕГО_РЕПО>
cd secret-at-the-table

# 2. Установить зависимости
npm install

# 3. Создать .env
cp .env.example .env

# 4. Запустить локальную PostgreSQL
docker compose -f docker-compose.dev.yml up -d db

# 5. Применить миграции
npx prisma migrate dev

# 6. Запустить dev-режим
npm run dev
```

Открыть:
- Фронт: `http://localhost:5173`
- API: `http://localhost:3000`

Войти как админ: `admin@example.com` / `changeme123` (из `.env`).

### Проверка игры

1. `/login` → войти как админ.
2. Создать ведущего (`host@test.ru` / `12345`).
3. Выйти → войти как ведущий.
4. «Запустить сессию» → откроется `/screen/XXXX` с QR.
5. В новой вкладке `/play/XXXX` → стать капитаном.
6. Начать игру → пройти 3 раунда.

---

## Production (Docker)

### Локальная проверка

```bash
docker compose build app
docker compose up -d
docker compose ps
docker compose logs app --tail 20
```

Открыть `http://localhost/`.

### Остановка

```bash
docker compose down
```

Полный сброс (включая БД):

```bash
docker compose down -v
```

---

## Деплой на VPS

### Требования к VPS

- Ubuntu 22.04 или 24.04 (или Debian 12)
- 1 GB RAM минимум
- Docker и docker-compose-plugin

### Шаг 1. Установить Docker

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin git
sudo usermod -aG docker $USER
# Выйти и зайти заново (или перелогиниться)
```

### Шаг 2. Клонировать проект

```bash
cd ~
git clone <URL_ВАШЕГО_РЕПО>
cd secret-at-the-table
```

### Шаг 3. Создать `.env`

```bash
cat > .env <<EOF
DB_PASSWORD=$(openssl rand -hex 16)
JWT_SECRET=$(openssl rand -hex 32)
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=strong-password
EOF
```

Сохраните пароль админа — он нужен для первого входа.

### Шаг 4. Запустить стек

```bash
docker compose up -d --build
```

Проверить статус:

```bash
docker compose ps
docker compose logs app --tail 20
```

Открыть: `http://IP_СЕРВЕРА/`

### Шаг 5. HTTPS без покупки домена (nip.io)

Сервис `nip.io` даёт бесплатные поддомены, ведущие на ваш IP. Например, для IP `123.45.67.89` работает `https://123.45.67.89.nip.io`.

Замените `Caddyfile`:

```
https://IP_СЕРВЕРА.nip.io {
    encode gzip
    reverse_proxy app:3000
}
```

Перезапустите:

```bash
docker compose restart caddy
```

Caddy сам получит Let's Encrypt-сертификат. Открывайте `https://IP_СЕРВЕРА.nip.io`.

### Шаг 6. Автозапуск

`docker compose` с `restart: unless-stopped` поднимает контейнеры после перезагрузки VPS автоматически.

---

## Как дорабатывать

### Добавить сценарий

1. Откройте `server/scenarios.ts`.
2. Добавьте объект в массив `SCENARIOS`:

```ts
{
  id: 'new-case',
  title: 'Название',
  icon: 'fa-<иконка Font Awesome>',
  description: 'Краткое описание',
  crime: 'Тип преступления',
  victim: 'Имя жертвы',
  location: 'Место',
  chapters: [
    { round: 1, title: 'Глава 1', atmosphere: 'Атмосфера', text: 'Текст...' },
    { round: 2, title: 'Глава 2', atmosphere: '...', text: '...' },
    { round: 3, title: 'Глава 3', atmosphere: '...', text: '...' }
  ],
  suspects: [
    { id: 's1', name: '...', role: '...', icon: '...', description: '...',
      motive: '...', alibi: '...', secret: '...' },
    { id: 's2', name: '...', role: '...', icon: '...', description: '...',
      motive: '...', alibi: '...', secret: '...', isGuilty: true }  // ← убийца
  ],
  clues: [
    { round: 1, icon: '...', type: 'фото', name: '...', desc: '...' },
    // по 3-4 улики на раунд
  ],
  solution: 'Разгадка: убийца — X, потому что...'
}
```

3. Перезапустите сервер (`npm run dev` или `docker compose restart app`). Сценарий появится в панели ведущего.

### Изменить время раунда

`server/engine.ts` → строка `export const ROUND_SECONDS = 600;` (600 секунд = 10 минут).

### Изменить штраф/награду

`server/engine.ts` → функция `nextPhase()`, блок `case 'voting'`:
- `t.score += 500` — награда.
- `t.score -= 200` — штраф.

### Добавить ведущего

Заходите как `admin` → `/admin` → форма «Создать ведущего».

### Заблокировать ведущего

`/admin` → кнопка «Заблокировать» напротив нужного.

### Удалить ведущего

Пока нет UI. Через БД:

```bash
docker compose exec db psql -U mystery -d mystery -c "DELETE FROM \"User\" WHERE email='host@test.ru';"
```

### Изменить стиль/палитру

`tailwind.config.js` → цвета (`ink`, `panel`, `accent`, ...).

### Заменить эффект дождя

`web/RainBackground.tsx` — canvas-анимация. Параметры:
- `Math.max(40, Math.floor(window.innerWidth / 16))` — количество капель.
- `p.s * 2.2` — скорость.
- `style={{ opacity: 0.55 }}` — прозрачность.

### Управление озвучкой

`web/SpeechContext.tsx` → `u.rate = 0.95` (скорость), `u.pitch = 1` (тон).  
Голос — системный, из браузера. Русский голос устанавливается в настройках ОС.

---

## Структура проекта

```
secret-at-the-table/
├─ Dockerfile                   # сборка production-образа
├─ docker-compose.yml           # production: app + db + caddy
├─ docker-compose.dev.yml       # dev: только db
├─ Caddyfile                    # конфиг реверс-прокси
├─ .env.example                 # пример переменных окружения
├─ prisma/
│  └─ schema.prisma             # структура БД
├─ server/                      # backend
│  ├─ index.ts                  # точка входа Fastify
│  ├─ auth.ts                   # JWT, argon2, куки
│  ├─ db.ts                     # Prisma Client
│  ├─ engine.ts                 # игровая логика (фазы, очки, сброс)
│  ├─ routes.ts                 # REST API
│  ├─ scenarios.ts              # 3 сценария (легко добавить)
│  └─ socket.ts                 # Socket.IO события
└─ web/                         # frontend
   ├─ main.tsx                  # точка входа React
   ├─ App.tsx                   # роутинг
   ├─ SpeechContext.tsx         # глобальная озвучка
   ├─ RainBackground.tsx        # canvas-дождь
   ├─ api.ts                    # fetch-обёртка
   ├─ socket.ts                 # socket.io-client
   ├─ ui.tsx                    # кнопки, карточки, инпуты
   ├─ index.css                 # Tailwind + градиент
   └─ views/
      ├─ Landing.tsx            # лендинг
      ├─ Login.tsx              # вход
      ├─ Admin.tsx              # админ-панель
      ├─ Host.tsx               # панель ведущего
      ├─ Screen.tsx             # большой экран (QR, раунды, озвучка)
      └─ Play.tsx               # мобильный клиент
```

---

## Полезные команды

### Логи

```bash
docker compose logs app -f          # логи app в реальном времени
docker compose logs caddy --tail 50 # логи Caddy
```

### Пересборка при изменениях

```bash
docker compose up -d --build
```

### БД: запросы напрямую

```bash
docker compose exec db psql -U mystery -d mystery
# \dt — список таблиц
# SELECT email, role, active FROM "User";
# \q — выход
```

### Пересоздать БД (полный сброс)

```bash
docker compose down -v
docker compose up -d --build
```

### Локальный TypeScript-чек

```bash
npx tsc --noEmit
```

---

## Что дальше добавить (идеи)

- Хранение игрового состояния в БД (чтобы переживало перезапуск).
- Крон для очистки старых сессий.
- Экспорт статистики в CSV.
- Кастомные сценарии через админку (WYSIWYG).
- PWA-манифест для мобильного клиента (иконка на домашнем экране).
- Push-уведомления.
- Yandex SpeechKit / Google TTS для более реалистичного голоса.
- Тёмная/светлая тема.

---

## Лицензия

MIT — используйте и модифицируйте свободно.