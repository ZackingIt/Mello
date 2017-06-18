class ChangeToTitle < ActiveRecord::Migration[5.0]
  def change
    rename_column :boards, :name, :title
    rename_column :lists, :name, :title
  end
end
