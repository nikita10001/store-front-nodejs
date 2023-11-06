import { $host } from './service';

export class CartService {
  static async getCart(cartId = 1) {
    const response = await $host.get(`/cart/${cartId}/devices`);
    return response.data;
  }
  static async addToCart(deviceId, cartId = 1) {
    const response = await $host.post(`/cart/${cartId}/addDevice/${deviceId}`);
    return response.data;
  }
  static async deleteFromCart(deviceId, cartId = 1) {
    const response = await $host.delete(`/cart/${cartId}/deleteDevice/${deviceId}`);
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
