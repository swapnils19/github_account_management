class ApplicationController < ActionController::Base
  before_action :authenticate
  layout :set_layout
  before_action :set_views


  def current_user
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

  def set_layout
    'react_application'
  end

  def set_views
    prepend_view_path "#{Rails.root.join('app', 'views', 'react_views')}"    
  end
end
