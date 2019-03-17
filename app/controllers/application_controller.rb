# application_controller.rb
class ApplicationController < Sinatra::Base
  helpers ApplicationHelper

  # set folder for templates to ../views, but make the path absolute
  set :views, File.expand_path('../../views', __FILE__)

  set :public_folder, 'public'

  before do
    uri = URI(request.url)

    return if %w(127.0.0.1 localhost).include?(uri.host)
    return unless uri.scheme == 'http'

    uri.scheme = 'https'
    redirect uri
  end

  # don't enable logging when running tests
  configure :production, :development do
    enable :logging
  end
end
