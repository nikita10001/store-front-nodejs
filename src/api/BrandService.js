import { $host } from './service';

export class BrandService {
  static async getAllBrands() {
    const response = await $host.get(`/brand/all`);
    return response.data;
  }
}
