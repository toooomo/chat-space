class Group < ApplicationRecord
  has_many :messages
  has_many :users, through: :members
  has_many :members
  validates :name, presence: true
  def show_last_message
    if (last_message = messages.last).present?
      # 三項演算子
      last_message.content? ? last_message.content : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end
end
