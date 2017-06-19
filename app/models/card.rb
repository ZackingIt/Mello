# == Schema Information
#
# Table name: cards
#
#  id        :integer          not null, primary key
#  list_id   :integer          not null
#  order     :integer          not null
#  body      :string           not null
#  due_date  :date
#  completed :boolean          default("false")
#

class Card < ApplicationRecord
  validates :title, :order, :list, presence: true

  belongs_to :list,
  class_name: :List,
  foreign_key: :list_id

  has_one :board,
    through: :list,
    source: :board

  has_one :author,
    through: :board,
    source: :author

end
