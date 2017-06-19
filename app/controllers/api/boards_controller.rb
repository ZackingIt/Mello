class Api::BoardsController < ApplicationController

  def index
    @boards = Board.where(author_id: current_user.id)
    @user = User.find(current_user.id)
    render :index
  end

  def create
    @board = Board.new(board_params)
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
    params.require(:board).permit(:author_id, :title, :privacy_status)
  end




end
