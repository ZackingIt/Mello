class Api::ListsController < ApplicationController
  before_action :require_login

  def create
    @list = List.new(list_params)
    if @list.save
      render :show
    else
      render json: @list.errors.full_messages, status: 422
    end
  end

  def show
    @list = List.find(params[:id])
    render :show
  end

  def list_params
    params.require(:list).permit(:board_id, :title, :ord)
  end

end
