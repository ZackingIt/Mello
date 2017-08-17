class Api::MovesController < ApplicationController

  def create
    if (params.flatten.include?("cardLoad"))

      #need to write case where list ids are the same and the new order is less than old order

      my_id = params[:cardLoad][:starting][:id].to_i

      old_list_id = params[:cardLoad][:starting][:listId].to_i
      new_list_id = params[:cardLoad][:ending][:listId].to_i

      old_card_order = params[:cardLoad][:starting][:cardIndex].to_i
      new_card_order = params[:cardLoad][:ending][:cardIndex].to_i

      if new_card_order < old_card_order && new_list_id == old_list_id
        new_card_order = (params[:cardLoad][:ending][:cardIndex].to_i - 0.5)
      else
        new_card_order = (params[:cardLoad][:ending][:cardIndex].to_i + 0.5)
      end

      p "MY NEW CARD ORDER"
      p new_card_order
      p "my moved card"
      p my_id
      starting_list_id = params[:cardLoad][:starting][:listId].to_i

      old_card_update_hash = Hash.new{ |h, k| h[k] = {} }
      old_lists_cards = List.find(new_list_id).cards
      p "my old lists cards"
      p old_lists_cards
      old_sorted_cards = old_lists_cards.sort_by{|card| card.ord}
      p "my sorted cards!"
      p old_sorted_cards
      old_sorted_cards.each_with_index do |card, i|
        old_card_update_hash[card.id] = { ord: i }
      end

      ActiveRecord::Base.transaction do
        Card.update(old_card_update_hash.keys, old_card_update_hash.values)
      end

      Card.update(my_id, {list_id: new_list_id, ord: new_card_order})

      card_update_hash = Hash.new{ |h, k| h[k] = {} }
      new_lists_cards = List.find(new_list_id).cards
      p "my new lists cards"
      p new_lists_cards
      sorted_cards = new_lists_cards.sort_by{|card| card.ord}
      p "my sorted cards!"
      p sorted_cards
      sorted_cards.each_with_index do |card, i|
        card_update_hash[card.id] = { ord: i }
      end

      ActiveRecord::Base.transaction do
        Card.update(card_update_hash.keys, card_update_hash.values)
      end

      from_pile = sort_and_map(List.find(starting_list_id).cards)
      to_pile = sort_and_map(new_lists_cards)

      p "MY TO PILE"
      p to_pile

      render json: { cardLoad: params[:cardLoad],
                     cardIds: { fromPile: from_pile, toPile: to_pile } }

    else
      render json: {}
    end
  end

  def sort_and_map(array)
    array.sort_by{|card| card.ord}.map{|card| card.id}
  end

  def move_params
    params.require(:cardLoad).permit!
  end

end
