# == Schema Information
#
# Table name: boards
#
#  id             :integer          not null, primary key
#  author_id      :integer          not null
#  name           :string           not null
#  privacy_status :boolean          default("true")
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Board < ApplicationRecord
validates :author, :name, presence: true
validates :privacy_status, inclusion: [true, false]

belongs_to :author,
  class_name: :User,
  primary_key: :id,
  foreign_key: :author_id

has_many :lists,
class_name: :List,
foreign_key: :list_id,
dependent: :destroy

has_many :cards,
  through: :lists,
  source: :cards

has_many :board_shares

has_many :shared_users,
  through: :board_shares,
  source: :user
end
