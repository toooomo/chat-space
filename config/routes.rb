Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'

  resources :users, only: [:index, :new, :edit, :update] do
    collection do
      get 'search'
    end
  end

  resources :members, only: [:index]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
end
