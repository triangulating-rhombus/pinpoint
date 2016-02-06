// const SERVER_ROOT = 'http://localhost:3000';
const SERVER_ROOT = 'http://tr-pinpoint-server.herokuapp.com';

export default sendRequest = (method, endpoint, bodyObj, token) => {
  const url = `${SERVER_ROOT}${endpoint}`;

  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['x-access-token'] = token;
  }

  const options = { headers, method };
  if (bodyObj) {
    options.body = JSON.stringify(bodyObj);
  }

  // fetch is React Native's built-in function to make AJAX requests
  return fetch(url, options);
}