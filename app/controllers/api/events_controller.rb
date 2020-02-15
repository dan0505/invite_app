class Api::EventsController < ApplicationController
  include CurrentUserConcern

  before_action :load_event, only: %i[show update]

  def index
    @events = Event.all
    render json: { events: @events}, status: :ok
  end

  def create
    if @current_user
      event = Event.create(name: params[:event_name])
      EventUser.create(event: event, user: @current_user, role: "creater")
      render json: { 
        message: "Event created!", 
        event: event,
        users: [{
          user: @current_user,
          role: "creater"
        }]
      }
    else
      render json: { error: "please login before create event"}, status: :forbidden
    end
  end

  def show
    render json: { event: @event, users: @event.users, roles: @event.event_users }, status: :ok
  end

  def update
    new_name = params[:event_name]
    p "====new event name", new_name
    unless new_name.blank?
      @event.update(name: new_name)
    end
    users = params[:users]
    users.each do |user|
      p "====user", user
      if user[:email].blank?
        next
      end
      user_rec = User.find_by_email(user[:email])
      p "====user rec", user_rec
      if user_rec.blank?
        user_rec = User.create(email: user[:email], password: "password11111")
      end
      p "====user rec", user_rec
      assoc = EventUser.where(event: @event, user: user_rec)
      puts "====assoc", assoc
      unless assoc.any?
        assoc = EventUser.create(event: @event, user: user_rec)
      else
        assoc = assoc.first
      end
      assoc.update(role: user[:role], name: user[:name])
      UserMailer.with(user: user_rec,user_name: user[:name], invitor: @current_user, url: "examplessss").evite_email.deliver_now
      p "====assoc", assoc
    end
    @event = Event.find(params[:id])
    render json: { message: "updated", event: @event, users: @event.users, roles: @event.event_users}, status: :ok
  end

  private
  def load_event
    @event = Event.find(params[:id])
  end
end