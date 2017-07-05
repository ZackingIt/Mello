class Api::MovesController < ApplicationController


  def create
    if (params.flatten.include?("cardLoad"))
      p "MY PARAMS"
      p params
      my_id = params[:cardLoad][:starting][:id].to_i
      p "my id is #{my_id}"
      @card = Card.find(my_id)
      # debugger
      p "MY CARD"
      p @card
      p "MY CARD WITH NEW LOCATION"
      # @card.ord = params[:cardLoad][:ending][:cardIndex]
      # @card.list_id = params[:cardLoad][:ending][:listId]
      old_list = @card.list.dup
      old_list_id = @card.list_id
      old_card_order = @card.ord
      new_list_id = params[:cardLoad][:ending][:listId].to_i
      new_card_order = params[:cardLoad][:ending][:cardIndex].to_i

      # IF I EDIT A CARD IN A NEW LIST, I NEED TO PUSH CARDS BEHIND etc
      #  IF I EDIT CARDS IN SAME LIST, I only update relative value of cards higher than me Post-change.

      increment_order = []
      decrement_order = []
      @card.update(list_id: new_list_id, ord: new_card_order )
        if old_list_id != new_list_id && @card.update(list_id: new_list_id, ord: new_card_order )
          increment_order = Card.where(["list_id = ? AND ord > ? AND id <> ?", new_list_id, new_card_order, @card.id]).to_a
          decrement_order = Card.where(["list_id = ? AND ord <= ? AND id <> ?", new_list_id, new_card_order, @card.id]).to_a
        elsif old_list_id == new_list_id && new_card_order < old_card_order
          increment_order = Card.where(["list_id = ? AND ord >= ? AND ord <= ? AND id <> ?", new_list_id, new_card_order, old_card_order, @card.id]).to_a
          #we have to find exactly the cards which
        elsif old_list_id == new_list_id && new_card_order > old_card_order
          decrement_order = Card.where(["list_id = ? AND ord >= ? AND ord <= ? AND id <> ?", new_list_id, new_card_order, old_card_order, @card.id]).to_a
        else
          p "HITTING UNKNOWN EDGE CASE"
        end
      p "pre-conversion"
      p increment_order
      p decrement_order

      increment_order.each { |el| el.ord = el.ord + 1}
      decrement_order.each { |el| el.ord = el.ord - 1}
      p "post conversion"
      p increment_order
      p decrement_order



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
