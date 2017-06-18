class CreateBoard < ActiveRecord::Migration[5.0]
  def change
    create_table :boards do |t|
      t.integer :author_id, null: false
      t.string :name, null: false
      t.boolean :privacy_status, default: true
      t.timestamps
    end
    add_index :boards, :author_id
  end
end
