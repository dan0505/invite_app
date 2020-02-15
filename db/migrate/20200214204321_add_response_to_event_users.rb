class AddResponseToEventUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :event_users, :response, :string
  end
end
