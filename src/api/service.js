import axios from 'axios';

export const $host = axios.create({
  baseURL: 'https://store-backend-nodejs.onrender.com',
  // baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});
//ДОАДАПТИВИТЬ ПОД ТЕЛЕФОН!!!!!!!!!!!!!!!!!!!!!!!!!!!
//B ПОФИКСИТЬ БАГ С КОРЗИНОЙ
//И ПРИМЕНИТЬ ФИЛЬТРАЦИЮ
