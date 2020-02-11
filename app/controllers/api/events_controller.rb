class Api::EventsController < ApplicationController
  include CurrentUserConcern

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
end