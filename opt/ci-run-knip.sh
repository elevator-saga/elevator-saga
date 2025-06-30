#!/bin/sh

# This script is used to run knip to check for unused dependencies
# and update package.json and package-lock.json accordingly.
./node_modules/.bin/knip --fix
git add package.json package-lock.json --force
# disable lefthook for the next command
LEFTHOOK=0
git commit -m "ci: update dependencies" --no-verify
