json.users {}
json.set! :users do
  @users.each do |user|
    json.set! user.id do
      json.id user.id
      json.username user.username
      json.boardIds Board.where(author_id: user.id).map{|board| board.id}
    end
  end
end
