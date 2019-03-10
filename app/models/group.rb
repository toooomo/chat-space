class Group < ApplicationRecord
  has_many :messages
  has_many :users, through: :members
  has_many :members
  validates :name, presence: true
end
