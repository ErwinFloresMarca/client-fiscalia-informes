import request from '@/utils/request';

export default class Foto {
  constructor() {
    this.uri = 'fotos';
  }
  getGrupo(id) {
    return request({
      url: '/' + this.uri + '/' + id + '/grupo',
      method: 'get',
    });
  }
}

export const FotoResource = new Foto();
