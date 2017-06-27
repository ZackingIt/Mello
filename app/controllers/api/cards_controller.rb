class Api::CardsController < ApplicationController
  before_action :require_login

  def create
    @card = Card.new(card_params)
    if @card.save
      render :show
    else
      render json: @card.errors.full_messages, status: 422
    end
  end

  def update
    @card = Card.find(params[:id])

    if @card.update(card_params)
      render json: @card
    else
      render json: @card.errors.full_messages, status: 422
    end

    # need to change list ID
  end

  def card_params
    params.require(:card).permit(:list_id, :order, :body, :due_date, :completed, :cardLoad)

  end

end
