class ApplicationController < ActionController::Base
  before_action :authenticate


  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

   def github(oauth_token: '')
    if @github.present?
      @github.oauth_token = oauth_token if @github.oauth_token.blank?
    else
      @github ||= Github.new(client_id: ENV['GITHUB_CLIENT_ID'],
                             client_secret: ENV['GITHUB_CLIENT_SECRET'],
                             oauth_token: oauth_token)
    end
    @github
   end

  private

  def authenticate
    return true if current_user
    redirect_to login_path
  end
end
