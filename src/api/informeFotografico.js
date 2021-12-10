import request from '@/utils/request';
import Resource from './resource';
import ResourceRelation from './resourceRelation';

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
    return new ResourceRelation(`informe-fotografico/${id}/grupos`);
  }
}

export const InformeFotograficoResource = new InformeFotografico();
