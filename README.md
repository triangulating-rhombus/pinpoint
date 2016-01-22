# Pinpoint

  Displays and predicts where people like you tend to hang out. Use it to find the local hotspots in real-time.

## Set-Up

  * Clone the repo: `git clone https://github.com/triangulating-rhombus/pinpoint.git`
  * Install the dependencies: `cd pinpoint && npm install`
  * Start webpack: `npm start`. (This is an alias defined in `package.json` to run webpack with the `--progress`, `--colors`, and `--watch` flags.)

## Primer on bundling with Webpack

  If you are new to React, bundling may be an unfamiliar concept. React apps consist of different components which need to all be packaged into one file for the browser to run. Below is a gentle introduction to bundling and Webpack.

### Pre-Requisites

  * You are familiar with Node.js's CommonJS module system, i.e. using `require` and `module.exports`.
  * You are familiar with using `<script>` tags to include JavaScript in HTML pages.

### Bundling

  * In concept, bundling brings the module system to the front-end.
  * In practice, bundling pulls together all the necessary .js files into one file so that the client doesn't need to make a separate server request for each file.

### Webpack

  * Webpack is one of the two common bundlers for React. (The other is Browserify, which is not as powerful.) This repo uses Webpack.
  * Webpack uses a configuration file in the root of your repo titled `webpack.config.js`. This file includes repo-specific information for the bundling process, such as the name of the bundle file you want it to output. When run, Webpack will automatically look for this file and use its settings.