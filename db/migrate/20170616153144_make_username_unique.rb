class MakeUsernameUnique < ActiveRecord::Migration[5.0]
  def change
    change_column :users, :username, :string, unique: true
  end
end
