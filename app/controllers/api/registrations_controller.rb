class Api::RegistrationsController < ApplicationController
  def create
    user = User.create!(
      name: params["user"]["name"],
      username: params["user"]["username"],
      email: params["user"]["email"],
      password: params["user"]["password"],
      password_confirmation: params["user"]["password_confirmation"],
    )
    if user
      session[:user_id] = user.id
      render json: {
        user: user,
      }, status: :created
    else
      render json: { error: "failed to create user" }, status: 500
    end
  end
end
