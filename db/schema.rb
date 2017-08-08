# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170808034700) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "board_shares", force: :cascade do |t|
    t.integer  "board_id",   null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["board_id"], name: "index_board_shares_on_board_id", using: :btree
    t.index ["user_id"], name: "index_board_shares_on_user_id", using: :btree
  end

  create_table "boards", force: :cascade do |t|
    t.integer  "author_id",                     null: false
    t.string   "title",                         null: false
    t.boolean  "privacy_status", default: true
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.index ["author_id"], name: "index_boards_on_author_id", using: :btree
  end

  create_table "cards", force: :cascade do |t|
    t.integer "list_id",                   null: false
    t.float   "ord",                       null: false
    t.string  "body",                      null: false
    t.date    "due_date"
    t.boolean "completed", default: false
    t.index ["list_id"], name: "index_cards_on_list_id", using: :btree
  end

  create_table "comments", force: :cascade do |t|
    t.integer  "author_id",  null: false
    t.integer  "card_id",    null: false
    t.string   "body",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_comments_on_author_id", using: :btree
    t.index ["card_id"], name: "index_comments_on_card_id", using: :btree
  end

  create_table "lists", force: :cascade do |t|
    t.integer  "board_id",   null: false
    t.string   "title",      null: false
    t.integer  "ord",        null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["board_id"], name: "index_lists_on_board_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "name"
    t.index ["username"], name: "index_users_on_username", unique: true, using: :btree
  end

end
