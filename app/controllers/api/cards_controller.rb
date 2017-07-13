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
    if params[:id] != "undefined"
      @card = Card.find(params[:id])
      if @card.update(card_params)
        render json: @card
      else
        render json: @card.errors.full_messages, status: 422
      end
    end
  end

  def card_params
    params.require(:card).permit(:list_id, :ord, :body, :due_date, :completed, :cardLoad)
  end

end
