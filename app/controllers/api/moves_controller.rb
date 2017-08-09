class Api::MovesController < ApplicationController

  def create
    if (params.flatten.include?("cardLoad"))
      my_id = params[:cardLoad][:starting][:id].to_i
      new_list_id = params[:cardLoad][:ending][:listId].to_i
      new_card_order = (params[:cardLoad][:ending][:cardIndex].to_i + 0.5)
      starting_list_id = params[:cardLoad][:starting][:listId].to_i

      Card.update(my_id, {list_id: new_list_id, ord: new_card_order})

      card_update_hash = Hash.new{ |h, k| h[k] = {} }
      new_lists_cards = List.find(new_list_id).cards
      new_lists_cards.sort_by{|card| card.ord}.each_with_index do |card, i|
        card_update_hash[card.id] = { ord: i }
      end

      ActiveRecord::Base.transaction do
        Card.update(card_update_hash.keys, card_update_hash.values)
      end

      from_pile = sort_and_map(List.find(starting_list_id).cards)
      to_pile = sort_and_map(new_lists_cards)

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
