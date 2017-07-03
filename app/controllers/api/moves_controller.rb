class Api::MovesController < ApplicationController


  def create
    if (params.flatten.include?("cardLoad"))
      my_id = params[:cardLoad][:starting][:id].to_i
      @card = Card.find(my_id)
      # debugger
      p "MY PARAMS"
      p params
      p "MY CARD"
      p @card
      p "MY CARD WITH NEW LOCATION"
      # @card.ord = params[:cardLoad][:ending][:cardIndex]
      # @card.list_id = params[:cardLoad][:ending][:listId]
      old_list = @card.list
      old_list_id = @card.list_id
      new_list_id = params[:cardLoad][:ending][:listId].to_i
      new_card_order = params[:cardLoad][:ending][:cardIndex].to_i

      # IF I EDIT A CARD IN A NEW LIST, I NEED TO PUSH CARDS BEHIND etc
      #  IF I EDIT CARDS IN SAME LIST, I only update relative value of cards higher than me Post-change.


      @card.update(list_id: new_list_id, ord: new_card_order )
      if @card.update(list_id: new_list_id, ord: new_card_order )
        increment_order = Card.where(["list_id = ? AND ord > ? AND id <> ?", new_list_id, new_card_order, @card.id]).to_a
        decrement_order = Card.where(["list_id = ? AND ord <= ? AND id <> ?", new_list_id, new_card_order, @card.id]).to_a
        p increment_order
        p decrement_order

        increment_order.each { |el| el.ord = el.ord + 1}
        decrement_order.each { |el| el.ord = el.ord - 1}
        p "post conversion"
        p increment_order
        p decrement_order

      end
      fromPile = old_list.cards.sort_by{|card| card.ord}.pluck(:id)
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
