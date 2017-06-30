class Api::BoardsController < ApplicationController
  before_action :require_login

  def index
    # @current_user_board_shares = BoardShare.where(user_id: current_user.id)

    @boards = current_user.boards.includes(:lists)
    @shared_boards = current_user.shared_boards.includes(:lists)

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
    @user_ids_shared_with = BoardShare.where(board_id: params[:id])
                            .map{|el| el.user_id}.uniq

    @usernames_shared_with = User.where(id: @user_ids_shared_with)
                            .map{|user| user.username}

    @user_ids_not_shared_with = User.where.not(id: @user_ids_shared_with)
                                .where.not(id: @board.author_id) #TODO: this query might be messing you up
                                .map{|el| el.id}.uniq

    @usernames_not_shared_with = User.where(id: @user_ids_not_shared_with)
                                .map{|user| user.username}

    render :show
  end

  def board_params
    params.require(:board).permit(:id, :author_id, :title, :privacy_status)
  end




end
