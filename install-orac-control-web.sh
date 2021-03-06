#!/bin/bash

REPO_NAME=orac-control-web
REPO_URL=https://github.com/dsedleckas/$REPO_NAME.git
APP_DIR=/usr/local/orac-control-web

cd $HOME

pwd

if [ -z `which git` ]; then
	echo "Installing git..."
	sudo apt-get update
	sudo apt-get install -y git
fi

if [ ! -d "$REPO_NAME" ]; then
	echo Cloning repository from $REPO_URL
	git clone $REPO_URL
	cd $REPO_NAME
else
	echo Updating $REPO_NAME repository with latest stuff
	cd $REPO_NAME
	git pull
fi

echo "Setup started..."
pip3 install -r backend/requirements.txt
sudo rm -rf $APP_DIR
sudo mkdir $APP_DIR
sudo mkdir $APP_DIR/client
sudo mkdir $APP_DIR/backend
sudo cp -R client/. $APP_DIR/client
sudo cp -R backend/. $APP_DIR/backend
sudo install -v -m 644 orac-control-web.service /usr/lib/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable orac-control-web.service
sudo systemctl start orac-control-web.service

echo "Done! Thank you!"