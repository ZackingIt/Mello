# API Endpoints

## HTML API

### Root

- `GET /`

## JSON API

### Users
- `GET /api/users/:id`
- state payload for header information
- `POST /api/users`
- `PATCH /api/users`

### Session
- `POST /api/session`
- `DELETE /api/session`

### Boards
- `GET /api/boards`
    - state payload for index page of boards
- `GET /api/boards/:id`
    - state payload for board show page which will
      execute list/card fetch (see state page)
- `POST /api/boards`
- `PATCH /api/boards/:id`
- `DELETE /api/boards/:id`

### Lists
- `POST /api/lists`
- `PATCH /api/lists/:id`
- `DELETE /api/lists/:id`

### Cards
- `GET /api/cards/:id/`
  - state payload for card modal page
  - returns associated comments as well
- `POST /api/cards`
- `PATCH /api/cards/:id`
- `DELETE /api/cards/:id`

### Comments
- `POST /api/comments`
- `PATCH /api/comments/:id`
- `DELETE /api/comments/:id`

### Board Shares
- `POST /api/board_shares/`
- `DELETE /api/board_shares/:id`
