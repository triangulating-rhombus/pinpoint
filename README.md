# Pinpoint

  Displays and predicts where people like you tend to hang out. Use it to find the local hotspots in real-time.

## Set-Up
  
  1. If you don't already have it, download and install [XCode 7.2](https://itunes.apple.com/us/app/xcode/id497799835). This is a large (4GB+) program available free from the App Store, used to run the simulator for React Native.
    * Make sure you have Mac OSX 10.10.5 or later.
    * Different XCode versions may also work, but download at your own discretion.
  2. Install global dependencies for React Native: `sudo npm install -g react-native react-native-cli`
  3. Clone this repo: `git clone https://github.com/triangulating-rhombus/pinpoint.git`
  4. Move into the repo directory: `cd pinpoint`
  5. Move into the client directory (which is also named pinpoint): `cd pinpoint`
  6. Install dependencies: `npm install`
  7. Open the file located at pinpoint/pinpoint/ios/pinpoint.xcodeproj with XCode. (The easiest way is to just locate the file in Finder and double-click it.)
    * This will automatically try to build the project, which may take a minute or two.
    * Assuming all went well, "Build Succeeded" should appear.
  8. When complete, click the Play button at the top left of the XCode window.
    * XCode will automatically start a server, which will appear in a terminal window.
    * When the server is ready, another "Build Succeeded" notification should appear in the main window.
    * XCode will then automatically open a simulator window. The simulator may take a minute or two to render fully.
    * Assuming all went well, the simulator should show a page that says "Welcome to React Native!" and some other instructions.