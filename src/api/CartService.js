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
  static async deleteFromCart(deviceId) {
    const response = await $host.delete(`/cart/deleteDevice/${deviceId}`);
    return response.data;
  }
  static async deleteAllFromCart() {
    const response = await $host.delete(`/cart/clear`);
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
