class Changecol < ActiveRecord::Migration[5.0]
  def change
    change_column(:cards, :ord, :float)
  end
end
