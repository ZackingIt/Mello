json.set! :card do
  json.list_id @card.list_id
  json.order @card.order
  json.body @card.body
  json.due_date @card.due_date
  json.completed @card.completed
end
