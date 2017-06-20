json.asyncStatus "SUCCESS"
json.error ""
json.set! :data do
  json.set! :boards do
    json.array! @boards do |board|
      json.extract! board, :id, :title, :privacy_status
    end
  end
  json.user @user, :id, :username, :name
end
