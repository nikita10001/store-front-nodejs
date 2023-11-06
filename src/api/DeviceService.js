import { $host } from './service';

export class DeviceService {
  static async getAllDevices(query = '', rangeFrom, rangeTo, limit, skip) {
    const _from = rangeFrom ? `&rangeFrom=${rangeFrom}` : '';
    const _to = rangeTo ? `&rangeTo=${rangeTo}` : '';
    const _limit = limit ? `&limit=${limit}` : '';
    const _skip = skip ? `&skip=${skip}` : '';
    const response = await $host.get(`/devices?query=${query}${_from}${_to}${_limit}${_skip}`);
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
}
