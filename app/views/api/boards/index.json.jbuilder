json.set! :boards do
  json.extract! @boards do |board|
    json.extract! board, :id, :title, :privacy_status
  end
end
