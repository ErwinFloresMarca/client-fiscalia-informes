import request from '@/utils/request';
import Resource from './resource';
export default class Foto extends Resource {
  constructor() {
    super('fotos');
  }
  getGrupo(id) {
    return request({
      url: '/' + this.uri + '/' + id + '/grupo',
      method: 'get',
    });
  }
}

export const FotoResource = new Foto();
