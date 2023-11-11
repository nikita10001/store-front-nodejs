import axios from 'axios';

const $host = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});

//прикручиваем проверку на авторизацию при каждом запросе
const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

$host.interceptors.request.use(authInterceptor);

export { $host };

// baseURL: 'https://store-backend-nodejs.onrender.com',
// baseURL: 'https://localhost:8080',
// 'Access-Control-Allow-Headers': '*',
