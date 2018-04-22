Rails.application.routes.draw do
  get '/login', to: 'sessions#new'
  resource :session, only: [] do
    get 'authorize'
    get 'callback'
  end
  resources :repository, only: [:index]
  resource :user, only: [:show]
  root 'user#show'
end
