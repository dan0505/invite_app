class AddRoleToEventUser < ActiveRecord::Migration[6.0]
  def change
    add_column :event_users, :role, :string
  end
end
