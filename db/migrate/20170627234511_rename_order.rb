class RenameOrder < ActiveRecord::Migration[5.0]
  def change

    rename_column :cards, :order, :ord
    rename_column :lists, :order, :ord

  end
end
