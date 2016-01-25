# Pinpoint

  Displays and predicts where people like you tend to hang out. Use it to find the local hotspots in real-time.

## Set-Up
  
  * Download and install XCode, if you do not already have it on your computer. This is a large (4GB+) program available free from the App Store. It is needed to run the mobile simulator for React Native.
  * Install global dependencies for React Native: `sudo npm install -g react-native react-native-cli`
  * Clone this repo: `git clone https://github.com/triangulating-rhombus/pinpoint.git`
  * Move into the repo directory: `cd pinpoint`
  * Move into the client directory (which is also named pinpoint): `cd pinpoint`
  * Install dependencies: `npm install`
  * Open the file located at pinpoint/pinpoint/ios/pinpoint.xcodeproj with XCode. (The easiest way is to just locate the file in Finder and double-click it.)
    - This will automatically try to build the project, which may take a minute or two. Assuming all went well, this should succeed.
  * When complete, click the Play button at the top left of the XCode window.
    - XCode will automatically pull up two windows: a server (in a terminal window) and a simulator window. The simulator may take a minute or two to render fully. Assuming all went well, the simulator should show a page that says "Welcome to React Native!" and some other instructions.