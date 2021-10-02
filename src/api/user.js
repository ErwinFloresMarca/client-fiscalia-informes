import request from '@/utils/request';
import Resource from './resource';

export default class User extends Resource {
  constructor() {
    super('users');
  }
  getAuthUser() {
    return request({
      url: '/' + this.uri + '/auth',
      method: 'get',
    });
  }
  login(resource) {
    return request({
      url: '/' + this.uri + '/login',
      method: 'post',
      data: resource,
    });
  }
}

export const UserResource = new User();
