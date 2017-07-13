class Api::MovesController < ApplicationController


  def create
    if (params.flatten.include?("cardLoad"))
      p "MY PARAMS"
      p params
      my_id = params[:cardLoad][:starting][:id].to_i
      # p "my id is #{my_id}"
      @card = Card.find(my_id)
      # debugger
      # p "MY CARD"
      # p @card
      # p "MY CARD WITH NEW LOCATION"
      # @card.ord = params[:cardLoad][:ending][:cardIndex]
      # @card.list_id = params[:cardLoad][:ending][:listId]
      old_list = @card.list
      # p old_list
      # p old_list.title
      new_cards = old_list.cards.sort_by{|card| card.ord}
      # p "new cards"
      # p new_cards
      i = 0
      while i < new_cards.length
        new_cards[i].update(ord: i)
        i+=1
      end

      # p "my old list's cardssss"
      # p old_list.cards
      old_list_id = @card.list_id
      old_card_order = @card.ord
      new_list_id = params[:cardLoad][:ending][:listId].to_i
      new_card_order = params[:cardLoad][:ending][:cardIndex].to_i

      starting_list_id = params[:cardLoad][:starting][:listId].to_i


      # IF I EDIT A CARD IN A NEW LIST, I NEED TO PUSH CARDS BEHIND etc
      #  IF I EDIT CARDS IN SAME LIST, I only update relative value of cards higher than me Post-change.

      increment_order = []
      decrement_order = []
        # if old_list_id != new_list_id && @card.update(list_id: new_list_id, ord: new_card_order )
      increment_order = Card.where(["list_id = ? AND ord > ? AND id <> ?", new_list_id, new_card_order, @card.id]).sort_by{|card| card.ord}
      decrement_order = Card.where(["list_id = ? AND ord <= ? AND id <> ?", new_list_id, new_card_order, @card.id]).sort_by{|card| card.ord}
        # elsif old_list_id == new_list_id && new_card_order < old_card_order
          # increment_order = Card.where(["list_id = ? AND ord >= ? AND ord <= ? AND id <> ?", new_list_id, new_card_order, old_card_order, @card.id]).to_a
          #we have to find exactly the cards which
        # elsif old_list_id == new_list_id && new_card_order > old_card_order
          # decrement_order = Card.where(["list_id = ? AND ord >= ? AND ord <= ? AND id <> ?", new_list_id, new_card_order, old_card_order, @card.id]).to_a
        # else
          # p "HITTING UNKNOWN EDGE CASE"
        # end
      # p "pre-conversion"
      # p "increment order"
      # p increment_order
      # p "decrement order"
      # p decrement_order


      from_pile_body = List.find(starting_list_id).cards.sort_by{|card| card.ord}.map{|card| card.body}
      to_pile_body = List.find(new_list_id).cards.sort_by{|card| card.ord}.map{|card| card.body}

      p "pre list ordering"
      p "from pile starting list"
      p from_pile_body

      p "to pile starting list"
      p to_pile_body

      p "old card PRE UPDATE"
      p @card

      decrement_order.each_with_index { |el, idx| el.update(list_id: new_list_id, ord: idx)}
      increment_order.each_with_index { |el, idx| el.update(list_id: new_list_id, ord: (idx + decrement_order.length))}
      @card.update(list_id: new_list_id, ord: new_card_order )


      from_pile_body = List.find(starting_list_id).cards.sort_by{|card| card.ord}.map{|card| card.body}
      to_pile_body = List.find(new_list_id).cards.sort_by{|card| card.ord}.map{|card| card.body}


      p "post list ORDERING"
      p "from pile starting list"
      p from_pile_body

      p "to pile starting list"
      p to_pile_body

      p "card POST UPDATE"
      p @card

      # p "post conversion"
      #
      #
      # p "decrement order"
      # p decrement_order
      #
      # p "moved card"
      # p @card
      #
      # p "increment order"
      # p increment_order

      from_sorted = List.find(starting_list_id).cards.sort_by{|card| card.ord}
      from_pile = from_sorted.map{|card| card.id}

      to_sorted = List.find(new_list_id).cards.sort_by{|card| card.ord}
      to_pile = to_sorted.map{|card| card.id}
      # fromPile = old_list.cards.sort_by{|card| card.ord}.pluck(:id)
      # toPile = @card.list.cards.sort_by{|card| card.ord}.pluck(:id)
      render json: {cardLoad: params[:cardLoad], cardIds: {fromPile: from_pile, toPile: to_pile}}
    else
      render json: {}
    end

  end

  def move_params
    # debugger
    params.require(:cardLoad).permit!
  end




end
