class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :name
      t.jsonb :extra

      t.timestamps
    end
  end
end