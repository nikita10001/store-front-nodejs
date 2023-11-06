import { $host } from './service';

export class BrandService {
  static async getAllBrands() {
    const response = await $host.get(`/brands`);
    return response.data;
  }
}
