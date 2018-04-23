Rails.application.routes.draw do
  get '/login', to: 'sessions#new'
  resource :session, only: [:destroy] do
    get 'authorize'
    get 'callback'
  end
  resources :repository, only: [:index, :show], param: :name
  root 'repository#index'
end
