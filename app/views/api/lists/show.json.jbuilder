json.set! :list do

  json.id @list.id
  json.board_id @list.board_id
  json.title @list.title
  json.ord @list.ord
  json.cardIds @list.cards.map(&:id)
end
