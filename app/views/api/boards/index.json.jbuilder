json.set! :boards do
  @boards.each do |board|
    json.set! board.id do
      json.author_id board.author_id
      json.title board.title
      json.listIds List.where(board_id: board.id).map{|el| el.id}
    end
  end
end

json.set! :lists do
  @lists.each do |list|
    json.set! list.id do
      json.board_id list.board_id
      json.title list.title
      json.order list.order
      json.cardIds Card.where(list_id: list.id).map{|el| el.id}
    end
  end
end

json.set! :cards do
  @cards.each do |card|
    json.set! card.id do
      json.list_id card.list_id
      json.body card.body
      json.order card.order
      json.due_date card.due_date
    end
  end
end
