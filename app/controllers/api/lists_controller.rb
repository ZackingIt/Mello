class Api::ListsController < ApplicationController
  before_action :require_login

  def create
    @list = List.new(list_params)
    debugger
    if @list.save
      render :show
    else
      debugger
      render json: @list.errors.full_messages, status: 422
    end
  end

  def list_params
    debugger
    params.require(:list).permit(:board_id, :title, :order)
  end

end
