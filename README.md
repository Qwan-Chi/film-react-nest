# FILM!

Учебный проект Яндекс Практикума: React-фронтенд и модульный API-сервис на NestJS с MongoDB.

## Запуск MongoDB

Создайте базу `practicum` и импортируйте исходные данные:

```bash
mongoimport --uri mongodb://127.0.0.1:27017/practicum \
  --collection films \
  --file backend/test/mongodb_initial_stub.json \
  --jsonArray
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
