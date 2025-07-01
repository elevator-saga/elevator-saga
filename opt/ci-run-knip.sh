#!/bin/sh

# This script is used to run knip to check for unused dependencies
# and update package.json and package-lock.json accordingly.
./node_modules/.bin/knip --fix --no-exit-code
git add . --force
# disable lefthook for the next command
LEFTHOOK=0
git commit -m "ci: update dependencies" --no-verify
