class Api::BoardSharesController < ApplicationController

  def index
    render :index
  end


  def create
    @board_share = BoardShare.new(board_share_params)
    if @board_share.save
      render :show
    else
      render json: @board_show.errors.full_messages, status: 422
    end
  end

  def board_share_params
    params.require(:board_share).permit(:user_id, :board_id)
  end

end
