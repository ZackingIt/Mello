class AddOrdIndex < ActiveRecord::Migration[5.0]
  add_index :cards, :ord
end
