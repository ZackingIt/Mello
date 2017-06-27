class Api::MovesController < ApplicationController


  def create

    if (params.flatten.include?("cardLoad"))
      my_id = params[:cardLoad][:starting][:id]
      @card = Card.find(my_id.to_i)
      # debugger
      p "MY PARAMS"
      p params
      p "MY CARD"
      p @card
      p "MY CARD WITH NEW LOCATION"

      @card.order = params[:cardLoad][:ending][:cardIndex]
      @card.list_id = params[:cardLoad][:ending][:listId]
      p @card

      render json: @card
    else
      render json: {}
    end

  end

  def move_params
    # debugger
    params.require(:cardLoad).permit!
  end




end
