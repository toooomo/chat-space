class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string     :name, null: false
      t.string     :email, unique: true
      t.integer    :group_id
      t.text       :messages, foreign_key: true
      t.timestamps
    end
  end
end
