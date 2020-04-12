import axios from 'axios';

export default axios.create({
  baseURL: 'http://www.mocky.io/v2/',
});

export function errorHandle(error) {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log('Error', error.message);
  }
  console.log(error.config);
}
