@echo off
TITLE Prospi Back

git diff --quiet || (git stash && git pull && npm i --save)

npm test
exit