class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      user_params[:username],
      user_params[:password]
    )
    @user_account = User.find_by_username(user_params[:username])
    if @user
      login(@user)
      render '/api/users/show'
    elsif @user_account != nil
      render json: ['Invalid password'], status: 422
    else
      render json: ['There isn\'t an account for this username'], status: 422
    end
  end

  def destroy
    if current_user
      logout
      render json: {}
    else
      logout
      render json: {}, status: 404
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
