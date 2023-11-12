import { $host } from './service';

export class DeviceService {
  static async getAllDevices(query = '', page, limit, rangeFrom, rangeTo) {
    const _from = rangeFrom ? `&rangeFrom=${rangeFrom}` : '';
    const _to = rangeTo ? `&rangeTo=${rangeTo}` : '';
    const _limit = limit ? `&limit=${limit}` : '';
    const _page = limit ? `&page=${page}` : '';
    // const _skip = skip ? `&skip=${skip}` : '';
    const response = await $host.get(`/devices?query=${query}${_page}${_limit}${_from}${_to}`);
    // const response = await $host.get(`/devices`);
    return response.data;
  }
  static async getDevice(id) {
    const response = await $host.get('/devices/' + id);
    return response.data;
  }
  static async removeDevice(id) {
    const response = await $host.delete('/devices/' + id);
    return response.data;
  }

  static async addDevice(device) {
    const response = await $host.post('/devices', {
      name: device.name,
      price: Number(device.price),
      rating: Number(device.rating),
      img: device.img,
      description: device.description,
    });
    return response.data;
  }
  static async updateDevice(id, newDevice) {
    const response = await $host.put(`/devices/${id}`, {
      name: newDevice.name,
      price: Number(newDevice.price),
      rating: Number(newDevice.rating),
      img: newDevice.img,
      description: newDevice.description,
    });
    return response.data;
  }

  static async getDevicesComments(deviceId) {
    const response = await $host.get('/comment/' + deviceId);
    return response.data;
  }
  static async addComment(deviceId, text) {
    const response = await $host.post('/comment/' + deviceId, { text });
    console.log(response);
    return response.data;
  }
  static async removeComment(commentId) {
    const response = await $host.delete('/comment/' + commentId);
    return response.data;
  }
}
