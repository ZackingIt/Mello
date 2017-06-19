class Api::BoardsController < ApplicationController

  def index
    @boards = Board.all
    render :index
  end

  


end
