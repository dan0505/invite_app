class UserMailer < ApplicationMailer
  default from: 'invite@evite.com'

  def evite_email
    @invitor = params[:invitor]
    @user = params[:user]
    @url = params[:url]
    @user_name = params[:user_name]
    mail(to: @user.email, subject: "You got a new Evite from #{@invitor.name}")
  end
end
