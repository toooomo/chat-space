class CreateGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :groups do |t|
      t.string     :name
      t.integer    :user_id, null: false, foreign_key: true
      t.text       :messages, foreign_key: true
      t.timestamps
    end
  end
end
