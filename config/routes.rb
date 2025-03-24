Rails.application.routes.draw do
  get 'profiles/show'
  root to: "profiles#show"

  get 'skills-tech-stack', to: "pages#skills-tech-stack"

  post "/generate", to: "playgrounds#generate"

  namespace :admin do
    resources :contacts, only: [:index]
  end

  resources :contacts, only: [:new, :create]


  resources :projects, only: [] do
    get "modal", on: :member
  end




  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html


  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
