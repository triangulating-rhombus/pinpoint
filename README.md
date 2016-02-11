# Pinpoint

  Displays and predicts where people like you tend to hang out. Use it to find the local hotspots in real-time.

## Set-Up

### Front-End
  
  1. If you don't already have it, download and install [XCode 7.2](https://itunes.apple.com/us/app/xcode/id497799835). This is a large (4GB+) program available free from the App Store, used to run the simulator for React Native.
    * Make sure you have Mac OSX 10.10.5 or later.
    * Different XCode versions may also work, but download at your own discretion.
  2. Install global dependencies for React Native: `sudo npm install -g react-native react-native-cli`
  3. Clone this repo: `git clone https://github.com/triangulating-rhombus/pinpoint.git`
  4. Move into the repo directory: `cd pinpoint`
  5. Move into the client directory (which is also named pinpoint): `cd pinpoint`
  6. Install dependencies: `npm install`
  7. Install React Native Package Manager: `npm install -g rnpm`
  8. Link React Native dependencies: `rnpm link`
  9. Replace the file located at node_modules/react-native/Libraries/Animated/src/AnimatedImplementation.js with the code [here](https://gist.githubusercontent.com/lelandrichardson/c0d938e02301f9294465/raw/5053cebc66989d27697bbb08450f360555309b0c/AnimatedImplementation.js).
  10. Open the file located at pinpoint/pinpoint/ios/pinpoint.xcodeproj with XCode. (The easiest way is to just locate the file in Finder and double-click it.)
    * This will automatically try to build the project, which may take a minute or two.
    * Assuming all went well, "Build Succeeded" should appear.
  11. When complete, click the Play button at the top left of the XCode window.
    * XCode will automatically start a server, which will appear in a terminal window.
    * When the server is ready, another "Build Succeeded" notification should appear in the main window.
    * XCode will then automatically open a simulator window. The simulator may take a minute or two to render fully.
  

### Back-End
  
  1. If you don't already have Postgres, install it: `brew install postgres`
  2. In the terminal, run:
```
> initdb pinpointdb 
> pg_ctl -D pinpointdb -l logfile start
> createdb pinpointdb
```
  3. Run the psql command line tool to create a role:
```
> psql pinpointdb
$ CREATE ROLE postgres WITH superuser;
$ ALTER ROLE postgres WITH login;
$ \q
```
  4. Make sure you are in the root directory of the repo and then start the server: `nodemon server.js`

## Useful commands

### Resetting database tables

  If your database tables are not up to date to the latest schemas, you need to drop all tables:
```
  > psql pinpointdb
  $ drop schema public cascade;
  $ create schema public;
  $ \q
```
  Then restart the server by running `rs` in the server's terminal tab, if the server is already running, or else `npm start` from the root directory.

### Starting your psql database

```
  > pg_ctl -D pinpointdb -l logfile start
```

### Accessing/Updating your local database in the terminal

```
  > psql pinpointdb
```

### Accessing/Updating your Heroku database in the terminal

```
  > heroku pg:psql
```

### Deploying your server on Heroku

  We've deployed our server [here](http://tr-pinpoint-server.herokuapp.com), but if you make edits and want to deploy your own version, Heroku makes the process very quick and easy. The free plan has its limitations, but it will be sufficient for simple testing.

  1. Create an app on heroku.com. The name you choose will determine the URL of your server.

  2. From the Heroku dashboard for your app, go to Resources and provision a "Heroku Postgres Add-on". Start with the Hobby Dev plan, which is free.

  3. Cd to your repo's root directory in terminal and add the Heroku remote:
```
> heroku git:remote -a tr-pinpoint-server
```
  
  4. To deploy code to the server, simply push to the Heroku remote as normal:
```
> git push heroku master
```
  (If you want to push a non-master branch, you can use `git push heroku your-branch-name:master`. This is not good form for a real production server, but it can be handy for testing purposes.)