class ApplicationController < ActionController::Base
  before_action :authenticate


  def current_user
return @current_user = User.first
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

   def github(oauth_token: '')
    if @github.present?
      @github.oauth_token = oauth_token if @github.oauth_token.blank?
    else
      @github ||= GithubService.new(oauth_token).client
    end
    @github
   end

  private

  def authenticate
    return true if current_user
    redirect_to login_path
  end
end
