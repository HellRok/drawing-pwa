class HomeController < ApplicationController
  get '/' do
    erb :'home/index', layout: :layout
  end
end
