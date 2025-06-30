#!/bin/sh

# run the test as defined in package.json
npm run test
git add public/coverage --force
# disable lefthook for the next command
LEFTHOOK=0
git commit -m "ci: update coverage report" --no-verify
