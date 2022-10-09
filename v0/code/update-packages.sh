#!/bin/sh

echo "This script cleans update all local nodes dependencies."
echo "It will edit the 'package.json' file after creating a"
echo "backup in the '.backup' folder."

# Backup
mkdir -p .backup
cp package.json .backup/

# Edit package.json
sed -i 's/".*": "\^[0-9]*\.[0-9]*\.[0-9]*",*//g' package.json
sed -i '/^$/d' package.json
# Remove node packages and distribution files
rm -Rf node_modules dist

# Install dependencies
yarn add -D @babel/core @babel/preset-env @babel/preset-typescript \
          @rollup/plugin-alias @rollup/plugin-commonjs \
          @rollup/plugin-replace @types/jest \
          @typescript-eslint/eslint-plugin @typescript-eslint/parser \
          babel-jest eslint eslint-config-prettier \
          eslint-plugin-import eslint-plugin-node eslint-plugin-prettier \
          eslint-plugin-promise jest phaser prettier typescript vite
