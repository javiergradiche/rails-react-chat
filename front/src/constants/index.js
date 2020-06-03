// require('dotenv').config({ debug: true});
// const result = dotenv.config()

// if (result.error) {
//   throw result.error
// }

// console.log(result.parsed)

export const API_ROOT = process.env.REACT_APP_API_ROOT; //|| 'http://localhost:3000';
export const API_WS_ROOT = process.env.REACT_APP_API_WS_ROOT; //|| 'ws://localhost:3000/cable';
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};
