class RemoveIndexTest < ActiveRecord::Migration[5.0]
  remove_index :cards, :ord
end
