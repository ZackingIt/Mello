class RenameOrder < ActiveRecord::Migration[5.0]
  def change

    rename_column :cards, :ord, :ord
    rename_column :lists, :ord, :ord

  end
end
