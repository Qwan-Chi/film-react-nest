# FILM!

Учебный проект Яндекс Практикума: React-фронтенд и модульный API-сервис на
NestJS, TypeORM и PostgreSQL.

## Подготовка PostgreSQL

Создайте пользователя `prac` и базу `films`, затем выполните SQL-файлы:

```bash
psql -d postgres -c "CREATE ROLE prac WITH LOGIN PASSWORD 'prac'"
psql -d postgres -c "CREATE DATABASE films OWNER prac"
psql -U prac -d films -f backend/test/prac.init.sql
psql -U prac -d films -f backend/test/prac.films.sql
psql -U prac -d films -f backend/test/prac.shedules.sql
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
