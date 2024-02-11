import { $host } from './api';

export class BrandService {
  static async getAll() {
    const response = await $host.get(`/brand/all`);
    return response.data;
  }
  static async createBrand(newBrand) {
    const response = await $host.post(`/brand/create`, newBrand);
    return response.data;
  }
}
