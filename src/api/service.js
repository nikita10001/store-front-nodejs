import axios from 'axios';

export const $host = axios.create({
  // baseURL: 'https://store-backend-nodejs.onrender.com',
  // baseURL: 'https://localhost:8080',
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': '*',
    Accept: 'application/json',
  },
});
//ДОАДАПТИВИТЬ ПОД ТЕЛЕФОН!!!!!!!!!!!!!!!!!!!!!!!!!!!
//B ПОФИКСИТЬ БАГ С КОРЗИНОЙ
//И ПРИМЕНИТЬ ФИЛЬТРАЦИЮ
