@echo off
TITLE Prospi Back Updater

git diff --quiet || git stash git pull npm i --save
exit