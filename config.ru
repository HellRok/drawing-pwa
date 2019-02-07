#!/usr/bin/env ruby

require 'sinatra/base'

require './app/helpers/application_helper.rb'
require './app/controllers/application_controller.rb'
require './app/controllers/home_controller.rb'

# map the controllers to routes
map('/') { run HomeController }
