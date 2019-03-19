FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/uploads/message/image/6/8MF2vi6mRe60du0_IxQ5Xg.jpg")}
    user
    group
  end
end
