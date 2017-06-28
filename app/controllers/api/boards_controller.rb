class Api::BoardsController < ApplicationController
  before_action :require_login

  def index

    @boards = Board.where(author_id: current_user.id)
    @shared_boards = User.where(author_id: current_user.id).shared_boards
    
    # @lists, @cards, @list_ids, @card_ids = [], [], [], []
    #
    # @boards.each do |board|
    #   @lists.concat(List.where(board_id: board.id))
    # end
    #
    # @lists.each do |list|
    #   @list_ids.push(list.id)
    # end
    #
    # @list_ids.each do |list_id|
    #   @cards.concat(Card.where(list_id: list_id))
    # end
    #
    # @cards.each do |card|
    #   @card_ids.push(card.id)
    # end
    #
    # @user = User.find(current_user.id)
    render :index
  end

  def create
    @board = current_user.boards.new(board_params)
    # @board = Board.new(board_params)
    # @board.author_id = current_user.id

    if @board.save
      render :show
    else
      render json: @board.errors.full_messages, status: 422
    end
  end


  def show
    @board = Board.find(params[:id])
    render :show
  end

  def board_params
    params.require(:board).permit(:id, :author_id, :title, :privacy_status)
  end




end
