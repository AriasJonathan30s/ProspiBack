@echo off
TITLE Prospi Back Updater
    git stash
    git pull
    npm i --save
exit