import io from '../../node_modules/socket.io-client/socket.io';

 //const SERVER_ROOT = 'http://localhost:3000';
// const SERVER_ROOT = 'http://10.8.30.231:3000';
const SERVER_ROOT = 'http://tr-pinpoint-server.herokuapp.com';

// Sends AJAX request and returns promise
export function sendRequest(method, endpoint, bodyObj, additionalHeaders = {}) {
  const url = `${SERVER_ROOT}${endpoint}`;
  const headers = { 'Content-Type': 'application/json', ...additionalHeaders };

  const options = { headers, method };
  if (bodyObj) {
    options.body = JSON.stringify(bodyObj);
  }

  // built-in React Native function to make AJAX requests
  return fetch(url, options);
}

// Creates socket connection to server and returns client socket
export function createSocketConnection() {
  return io.connect(SERVER_ROOT, { jsonp: false });
}
