Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resources :users, only: [ :create ]
    resource :session, only: [ :create, :destroy ]
    resources :boards, only: [:index, :show, :create, :update]
    resources :lists, only: [:create, :destroy, :update]
    resources :cards, only: [:create, :destroy, :update]
  end
end
