class StaticPagesController < ApplicationController
  def root
    @current_user = current_user
    render :root
  end
end
