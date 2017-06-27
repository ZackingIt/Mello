
json.set! :card do
  json.id @card.id
  json.list_id @card.list_id
  json.ord @card.ord
  json.body @card.body
  json.due_date @card.due_date
  json.completed @card.completed
end
