class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :github_name
      t.integer :github_id
      t.json :github_details
      t.timestamps
    end
  end
end
