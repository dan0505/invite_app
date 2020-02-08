if Rails.env == "production"
  Rails.application.config.session_store :cookie_store, key: "_envit_app", domain: "heroku"
else
  Rails.application.config.session_store :cookie_store, key: "_envit_app"
end
