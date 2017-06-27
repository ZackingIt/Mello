class CreateCard < ActiveRecord::Migration[5.0]
  def change
    create_table :cards do |t|
      t.integer :list_id, null: false
      t.integer :ord, null: false
      t.string :body, null: false
      t.date :due_date
      t.boolean :completed, default: false
    end
    add_index :cards, :list_id
  end
end
