import { $host } from './service';

export class CommentService {
  static async getDevicesComments(deviceId) {
    const response = await $host.get('/comment/' + deviceId);
    return response.data;
  }
  static async addComment(deviceId, text) {
    const response = await $host.post('/comment/' + deviceId, { text });
    return response.data;
  }
  static async removeComment(commentId) {
    const response = await $host.delete('/comment/' + commentId);
    return response.data;
  }
  static async getAllComments() {
    const response = await $host.get('/comment/');
    return response.data;
  }
}
