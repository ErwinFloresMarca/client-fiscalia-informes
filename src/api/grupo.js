import request from '@/utils/request';
import Resource from './resource';
import ResourceRelation from './resourceRelation';

export default class Grupo extends Resource {
  constructor() {
    super('grupos');
  }
  getInformeFotografico(id) {
    return request({
      url: '/' + this.uri + '/' + id + '/informe-fotografico',
      method: 'get',
    });
  }
  Foto(id) {
    return new ResourceRelation(`grupos/${id}/fotos`);
  }
}

export const GrupoResource = new Grupo();
