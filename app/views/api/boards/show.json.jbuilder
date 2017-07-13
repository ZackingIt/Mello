json.set! :board do
  json.id @board.id
  json.author_id @board.author_id
  json.title @board.title
  json.listIds @board.lists.map{|el| el.id}
end

json.lists({})
json.set! :lists do

  @board.lists.each do |list|
    json.set! list.id do
      json.board_id list.board_id
      json.title list.title
      json.ord list.ord
      json.cardIds list.cards.sort_by{|card| card.ord}.map{|card| card.id}
      # json.cardIds list.cards.map{|el| el.id}
    end
  end
end

json.cards({})
json.set! :cards do
  @board.cards.each do |card|
    json.set! card.id do
      json.list_id card.list_id
      json.body card.body
      json.ord card.ord
      json.due_date card.due_date
    end
  end
end

json.set! :user_sharing do
  json.set! :shared_users do
    json.shared_user_ids @user_ids_shared_with
    json.shared_usernames @usernames_shared_with
  end
  json.set! :unshared_users do
    json.unshared_user_ids @user_ids_not_shared_with
    json.unshared_usernames @usernames_not_shared_with
  end
  # json.unshared_users @users_not_shared_with
end
