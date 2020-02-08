Rails.application.routes.draw do
  namespace :api do
    resources :sessions, only: %i[create]
    resources :registrations, only: %i[create]
    delete :logout, to: "sessions#logout"
    get :logged_in, to: "sessions#logged_in"
  end

  root "homepage#index"

  get "*path", to: "homepage#index"
end
