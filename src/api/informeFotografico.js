import request from '@/utils/request';
import Resource from './resource';

export default class InformeFotografico extends Resource {
  constructor() {
    super('informe-fotograficos');
  }
  getUser(id) {
    return request({
      url: '/' + this.uri + '/' + id + '/user',
      method: 'get',
    });
  }
  Grupo(id) {
    return new Resource(`/informe-fotografico/${id}/grupos`);
  }
}

export const InformeFotograficoResource = new InformeFotografico();
