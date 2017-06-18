## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
name            | string    | not null
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## boards
column name | data type | details
-------------------|-----------|-----------------------
id                 | integer   | not null, primary key
author_id          | integer   | not null, foreign key (references users), indexed
name               | string    | not null
privacy_status     | boolean   | default: true

## lists
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
board_id    | integer   | not null, foreign key (references boards), indexed
title       | string    | not null
order       | integer   | not null

## cards
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
list_id     | integer   | not null, foreign key (references lists), indexed
title       | string    | not null
description | string    |
due_date    | datetime  |

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | string    | not null, foreign key (references users), indexed
card_id     | integer   | not null, foreign key (references cards), indexed
body        | string    | not null

## board_shares
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
board_id    | integer   | not null, foreign key (references boards), indexed, unique [user_id]
user_id     | integer   | not null, foreign key (references users), indexed
