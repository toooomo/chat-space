Rails.application.routes.draw do
  devise_for :users
  root 'messages#index'
  resources :users, only: [:index, :edit, :update]

  resources :groups, only: [:new, :create, :edit, :update]
    resources :messages, only: [:index, :create]
end
