class Api::SessionsController < ApplicationController
  include CurrentUserConcern

  def create
    user = User.find_by(email: params["user"]["email"]).try(:authenticate, params["user"]["password"])
    if user
      session[:user_id] = user.id
      render json: {
        status: :created,
        logged_in: true,
        user: user,
      }
    else
      render json: { error: "failed to login" }, status: 401
    end
  end

  def logout
    reset_session
    render json: {
      logged_out: true,
    }, status: 200
  end

  def logged_in
    if @current_user
      p "logged_in"
      render json: {
        logged_in: true,
        user: @current_user,
      }, status: :ok
    else
      render json: {
        logged_in: false,
      }, status: :ok
    end
  end
end
