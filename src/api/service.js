import axios from 'axios';

export const $host = axios.create({
  baseURL: 'http://localhost:8080',
  // baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});
