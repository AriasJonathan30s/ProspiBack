@echo off
TITLE Prospi Back

git diff --quiet || (git stash && git pull origin master && npm i --save)

start npm test
exit