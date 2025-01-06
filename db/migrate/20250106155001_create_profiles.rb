class CreateProfiles < ActiveRecord::Migration[7.1]
  def change
    create_table :profiles do |t|
      t.string :name
      t.text :bio
      t.text :skills
      t.text :experience

      t.timestamps
    end
  end
end
