#!/bin/bash

echo Removing the remote
git remote remove origin
echo Running bundle install
bundle install
echo Running yarn install
yarn install
