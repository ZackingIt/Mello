# == Schema Information
#
# Table name: lists
#
#  id         :integer          not null, primary key
#  board_id   :integer          not null
#  title      :string           not null
#  order      :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class List < ApplicationRecord
  validates :title, :board, :order, presence: true

  belongs_to :board,
  class_name: :Board,
  foreign_key: :board_id

  has_one :author,
    through: :board,
    source: :author

  has_many :cards, dependent: :destroy
end
