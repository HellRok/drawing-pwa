# application_controller.rb
class ApplicationController < Sinatra::Base
  helpers ApplicationHelper

  # set folder for templates to ../views, but make the path absolute
  set :views, File.expand_path('../../views', __FILE__)

  set :public_folder, 'public'

  # don't enable logging when running tests
  configure :production, :development do
    enable :logging
  end
end
