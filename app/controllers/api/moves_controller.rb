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
      # @card.ord = params[:cardLoad][:ending][:cardIndex]
      # @card.list_id = params[:cardLoad][:ending][:listId]
      oldList = @card.list
      if @card.update(list_id: params[:cardLoad][:ending][:listId].to_i, ord: params[:cardLoad][:ending][:cardIndex].to_i+1 )
        a = Card.where(["list_id = ? AND ord > ?", params[:cardLoad][:ending][:listId].to_i, params[:cardLoad][:ending][:cardIndex].to_i ])
        debugger
        # a.update_all(ord: el.ord + 1 ) }
      end
      fromPile = oldList.cards.sort_by{|card| card.ord}.pluck(:id)
      toPile = @card.list.cards.sort_by{|card| card.ord}.pluck(:id)
      p fromPile
      p toPile

      render json: {cardLoad: params[:cardLoad], cardIds: {fromPile: fromPile, toPile: toPile}}
    else
      render json: {}
    end

  end

  def move_params
    # debugger
    params.require(:cardLoad).permit!
  end




end
