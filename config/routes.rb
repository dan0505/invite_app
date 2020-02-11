Rails.application.routes.draw do
  namespace :api do
    resources :sessions, only: %i[create] do
      collection do
        get :logout
        get :logged_in
      end
    end
    resources :registrations, only: %i[create]

    resources :events
  end

  root "homepage#index"

  get "*path", to: "homepage#index"
end
