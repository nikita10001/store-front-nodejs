import { $host } from './service';

export class CartService {
  static async getCart(userId) {
    const response = await $host.get(`/cart/items/${userId}`);
    return response.data;
  }
  static async addToCart(deviceId) {
    const response = await $host.put(`/cart/addDevice/${deviceId}`);
    return response.data;
  }
  static async deleteFromCart(deviceId, cartId = 1) {
    const response = await $host.delete(`/cart/654928e5d2a80cc598ec7f9f/deleteDevice/${deviceId}`);
    return response.data;
  }
  // static async getDevice(id) {
  //   const response = await $host.get('/devices/' + id);
  //   return response.data;
  // }
  // static async removeDevice(id) {
  //   const response = await $host.delete('/devices/' + id);
  //   return response.data;
  // }
}
