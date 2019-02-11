#!/bin/bash

GREEN='\033[0;32m';
CLEAR_COLOUR='\033[0m';

function green_echo {
  echo -e "${GREEN}$1${CLEAR_COLOUR}"
}


green_echo 'Removing the remote'
git remote remove origin
green_echo 'Running bundle install'
bundle install
green_echo 'Running yarn install'
yarn install

green_echo 'Cleaning up files'
rm bootstrap.sh
