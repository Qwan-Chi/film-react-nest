# FILM!

Учебный проект Яндекс Практикума: React-фронтенд и модульный API-сервис на
NestJS, TypeORM и PostgreSQL.

Развёрнутое приложение: [http://84.201.160.128](http://84.201.160.128).

## Подготовка PostgreSQL

Создайте пользователя `prac` и базу `films`, затем выполните SQL-файлы:

```bash
psql -d postgres -c "CREATE ROLE prac WITH LOGIN PASSWORD 'prac'"
psql -d postgres -c "CREATE DATABASE films OWNER prac"
psql -U prac -d films -f backend/test/prac.init.sql
psql -U prac -d films -f backend/test/prac.films.sql
psql -U prac -d films -f backend/test/prac.schedules.sql
```

## Запуск backend

```bash
cd backend
npm ci
cp .env.example .env
npm run start:dev
```

Сервис доступен на `http://localhost:3000`:

- `GET /api/afisha/films` — список фильмов;
- `GET /api/afisha/films/:id/schedule` — расписание фильма;
- `POST /api/afisha/order` — бронирование билетов;
- `GET /content/afisha/:file` — изображения афиши.

## Проверка

```bash
cd backend
npm run lint
npm test -- --runInBand
npm run build
```

## Логирование

Формат логов backend задаётся переменной `LOGGER_FORMAT`:

- `dev` — стандартный читаемый вывод NestJS;
- `json` — одна JSON-запись на событие;
- `tskv` — поля `key=value`, разделённые табуляцией.

## Запуск в Docker

Скопируйте пример окружения и при необходимости измените значения:

```bash
cp .env.example .env
docker compose up -d --build
```

Приложение откроется на [http://localhost](http://localhost). В Compose входят
PostgreSQL, backend, контейнер со статикой frontend и Nginx. Данные PostgreSQL и
собранный frontend хранятся в отдельных Docker volumes.

Для сервера используется конфигурация без локальной сборки:

```bash
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

Образы `film-backend`, `film-frontend` и `film-nginx` автоматически собираются
GitHub Actions. При коммитах в `main` они публикуются в GitHub Container
Registry.
