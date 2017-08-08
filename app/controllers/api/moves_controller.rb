class Api::MovesController < ApplicationController

  def create
    if (params.flatten.include?("cardLoad"))
      my_id = params[:cardLoad][:starting][:id].to_i
      @card = Card.find(my_id)
      # old_list = @card.list
      # old_sister_cards = old_list.cards.sort_by{|card| card.ord}


      # p reordered_old_list
      # reordered_old_list = Hash.new{ |h, k| h[k] = {} }
      # reordered_new_list = Hash.new{ |h, k| h[k] = {} }

      # old_sister_cards.each_with_index.map do |card, i |
      #   reordered_old_list[card.id] = {ord: i}
      # end



      # old_sister_cards.each_with_index do |card, i|
      #   card.update(ord: i)
      # end
      # ActiveRecord::Base.transaction do
      #   Card.update(reordered_old_list.keys, reordered_old_list.values)
      # end


      # need to revise this into a batch process -- this is enforcing 0 to list-length -1 ordering.

      old_list_id = @card.list_id
      old_card_order = @card.ord

      new_list_id = params[:cardLoad][:ending][:listId].to_i
      new_card_order = (params[:cardLoad][:ending][:cardIndex].to_i + 0.5)
      starting_list_id = params[:cardLoad][:starting][:listId].to_i
      p "MY NEW CARD ODERS"
      p new_card_order
      @card.update(list_id: new_list_id, ord: new_card_order)

      new_list = List.find(new_list_id)
      cards_inc_order_hash = Hash.new{ |h, k| h[k] = {} }
      card_update_hash = Hash.new{ |h, k| h[k] = {} }

      # cards_inc_order = Card.where(["list_id = ? AND ord > ? AND id <> ?", new_list_id, new_card_order, @card.id])
      # cards_dec_order = Card.where(["list_id = ? AND ord <= ? AND id <> ?", new_list_id, new_card_order, @card.id])
      new_list.cards.sort_by{|card| card.ord}.each_with_index do |card, i|
        card_update_hash[card.id] = {ord: i}
      end


      # cards_inc_order.each do |card_ar_object|
      #   cards_inc_order_hash[card_ar_object.id] = { ord: (card_ar_object.ord + cards_dec_order.length + 1) }
      # end



      p "MY ORDER HASH"
      p cards_inc_order_hash

      ActiveRecord::Base.transaction do

        Card.update(card_update_hash.keys, card_update_hash.values)
        # Card.update(cards_inc_order_hash.keys, cards_inc_order_hash.values)
      end

      new_lists_cards = new_list.cards
      from_pile = List.find(starting_list_id).cards
                      .sort_by{|card| card.ord}
                      .map{|card| card.id}

      to_pile =     new_lists_cards
                    .sort_by{|card| card.ord}
                    .map{|card| card.id}

      render json: {cardLoad: params[:cardLoad], cardIds: {fromPile: from_pile, toPile: to_pile}}





    else
      render json: {}
    end

  end

  def move_params
    params.require(:cardLoad).permit!
  end




end
