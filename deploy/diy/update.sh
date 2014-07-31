#
# DIY VPS pull update
#
cd ~/wpspa-transitional-project
# Undo any monkey business, sorry monkeys
git checkout -- .
# Get the latest code, requires password for origin
echo "Getting latest code from origin..."
git pull origin

# Prep to build release
npm install grunt-contrib-imagemin
# Build the app, this also updates the ATF content cache
grunt release
# Overlay the production config state...
# THIS IS NOT REQUIRED ANYMORE, Test env APP_DIR solution next deployment
cp ../install/production.js dist/release/server/config

# Goto the release distribution area
pushd dist/release

# Install the production dependencies
npm install --production

# Restart the app
sudo /etc/init.d/node-app restart
status=$?
# Initialize the rest of the cached stuff
if [ $status -eq 0 ]; then
  echo "Updating routes..."
  env NODE_ENV=production server/workers/routes/bin/routes
  status=$?
  if [ $status -eq 0 ]; then
    echo "Updating snapshots..."
    env NODE_ENV=production server/workers/snapshots/bin/snapshots
  fi
fi
popd
#
# Only update the whole cache if the site is actually running
#   Jobs routes and snapshots depend on the up-to-date app actually running
# env NODE_ENV=production server/workers/init/bin/init
#
cd -