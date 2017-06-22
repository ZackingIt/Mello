json.set! :board do
  json.id @board.id
  json.author_id @board.author_id
  json.title @board.title
  json.listIds @board.lists.map{|el| el.id}
end

json.set! :lists do

  @board.lists.each do |list|
    json.set! list.id do
      json.board_id list.board_id
      json.title list.title
      json.order list.order
      json.cardIds list.cards.map{|el| el.id}
    end
  end
end

json.set! :cards do
  @board.cards.each do |card|
    json.set! card.id do
      json.list_id card.list_id
      json.body card.body
      json.order card.order
      json.due_date card.due_date
    end
  end
end
