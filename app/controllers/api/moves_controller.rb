class Api::MovesController < ApplicationController


  def create
    # @card = Card.find(params[:id])
    # p params
    debugger
    # if @card.update(card_params)
    #   render json: @card
    # else
    #   render json: @card.errors.full_messages, status: 422
    # end

    render json: @card
  end

  def move_params
    debugger
    params.require(:cardLoad).permit!
  end




end
