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
  5. Install general dependencies: `npm install`
  6. Move into the client directory (which is also named pinpoint): `cd pinpoint`
  7. Install client dependencies: `npm install`
  8. Install React Native Package Manager: `npm install -g rnpm`
  9. Link React Native dependencies: `rnpm link`
  10. Replace the file located at node_modules/react-native/Libraries/Animated/src/AnimatedImplementation.js with the code [here](https://gist.githubusercontent.com/lelandrichardson/c0d938e02301f9294465/raw/5053cebc66989d27697bbb08450f360555309b0c/AnimatedImplementation.js).
  11. Open the project in XCode: `open ios/pinpoint.xcodeproj`
    * This will automatically try to build the project, which may take a minute or two.
    * Assuming all went well, "Build Succeeded" should appear.
  12. When complete, click the Play button at the top left of the XCode window.
    * XCode will automatically start a server, which will appear in a terminal window.
    * When the server is ready, another "Build Succeeded" notification should appear in the main window.
    * XCode will then automatically open a simulator window. The simulator may take a minute or two to render fully.
  

### Back-End
  
  1. If you don't already have Postgres, install it: `brew install postgres`
  2. In the terminal, run:

        > initdb pinpointdb 
        > pg_ctl -D pinpointdb -l logfile start
        > createdb pinpointdb

  3. Run the psql command line tool to create a role:

        > psql pinpointdb
        $ CREATE ROLE postgres WITH superuser;
        $ ALTER ROLE postgres WITH login;
        $ \q

  4. Make sure you are in the root directory of the repo and then start the server: `npm start`

## Useful Commands

### Drop all database tables

  This is the easiest way to reset your database after changing schemas. **NOTE: This will permanently destroy all the data stored in your database.**
```
  > psql pinpointdb
  $ drop schema public cascade;
  $ create schema public;
  $ \q
```
  Then restart the server (type `rs` in the running server's terminal tab).

### Start your local database

```
  > pg_ctl -D pinpointdb -l logfile start
```

### Access/Update your local database via terminal

```
  > psql pinpointdb
```

### Access/Update your Heroku database via terminal

```
  > heroku pg:psql
```

### Deploy your server on Heroku

  We've deployed our server [here](http://tr-pinpoint-server.herokuapp.com), but if you make edits and want to deploy your own version, Heroku makes the process quick and easy. The free plan has its limitations, but it is sufficient for simple testing.

  1. Create an app on heroku.com. The name you choose will determine the URL of your server, e.g. http://your-app-name.herokuapp.com.

  2. From the Heroku dashboard for your app, go to Resources and provision a "Heroku Postgres Add-on". Start with the default Hobby Dev plan, which is free.

  3. Cd to your repo's root directory in terminal and add the Heroku remote:

        > heroku git:remote -a your-app-name
  
  4. To deploy code to the server, simply push to the Heroku remote:

        > git push heroku master

  (If you want to push a non-master branch, you can do so with `git push heroku your-branch-name:master`. This is not good form for a real production server, but it can be handy for testing purposes.)



  ### PinPoint Architecture
  ![PinPoint Logo](http://s18.postimg.org/ftop3t5kp/Screen_Shot_2016_02_11_at_7_21_46_PM.png)

