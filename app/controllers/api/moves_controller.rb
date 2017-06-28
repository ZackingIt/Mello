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

      # IF I EDIT A CARD IN A NEW LIST, I NEED TO PUSH CARDS BEHIND etc
      #  IF I EDIT CARDS IN SAME LIST, I only update relative value of cards higher than me Post-change.
      

      @card.update(list_id: params[:cardLoad][:ending][:listId].to_i, ord: params[:cardLoad][:ending][:cardIndex].to_i )
      if @card.update(list_id: params[:cardLoad][:ending][:listId].to_i, ord: params[:cardLoad][:ending][:cardIndex].to_i )
        a = Card.where(["list_id = ? AND ord > ? AND id <> ?", params[:cardLoad][:ending][:listId].to_i, params[:cardLoad][:ending][:cardIndex].to_i, @card.id])
        b = Card.where(["list_id = ? AND ord <= ? AND id <> ?", params[:cardLoad][:ending][:listId].to_i, params[:cardLoad][:ending][:cardIndex].to_i, @card.id ])
        p a.to_a
        p b.to_a
        # debugger
        a.to_a.each { |el| el.ord = el.ord + 1}
        b.to_a.each { |el| el.ord = el.ord - 1}
        p "post conversion"
        p a.to_a
        p b.to_a
        # p a.to_a
        # debugger
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
