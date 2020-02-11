class User < ApplicationRecord
  has_secure_password

  validates_presence_of :email
  validates_uniqueness_of :email

  has_many :event_users
  has_many :events, through: :event_users
  
end
