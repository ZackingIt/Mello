class Api::BoardsController < ApplicationController
  before_action :require_login

  def index
    @boards = current_user.boards.includes(:lists)
    @shared_boards = current_user.shared_boards.includes(:lists)

    render :index
  end

  def create
    @board = current_user.boards.new(board_params)
    # same as below:
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
                                .where.not(id: @board.author_id)
                                .map{|el| el.id}.uniq

    @usernames_not_shared_with = User.where(id: @user_ids_not_shared_with)
                                .map{|user| user.username}
    @board.lists.each{|list| p list.cards}
    render :show
  end

  def board_params
    params.require(:board).permit(:id, :author_id, :title, :privacy_status)
  end




end
