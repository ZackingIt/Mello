class Api::CardsController < ApplicationController
  before_action :require_login

  def create
    # @card = current_user.cards.new(board_params)
    @card = Card.new(card_params)
    # debugger
    if @card.save
      # debugger
      render :show
    else
      render json: @card.errors.full_messages, status: 422
    end
  end

  def card_params
    params.require(:card).permit(:list_id, :order, :body, :due_date, :completed)
  end




end
