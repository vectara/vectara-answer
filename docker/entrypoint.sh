#!/bin/bash

# Copy new files to the build directory
cp /usr/src/app/extras/* /usr/src/app/build/

# Start the server
export PORT=3000
exec node server/index.js