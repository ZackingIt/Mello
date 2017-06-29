# == Schema Information
#
# Table name: board_shares
#
#  id         :integer          not null, primary key
#  board_id   :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class BoardShare < ApplicationRecord
  validates :user, :board, presence: true
  validates :user, uniqueness: { scope: :board }
  validates_uniqueness_of :user_id, :scope => :board_id

  belongs_to :user,
  foreign_key: :user_id,
  class_name: :User

  belongs_to :board,
  foreign_key: :board_id,
  class_name: :Board

end
