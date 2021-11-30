import Resource from './resource';
import request from '@/utils/request';
export default class Caso extends Resource {
  constructor() {
    super('casos');
  }
  getFiscal(id) {
    return request.get(`/${this.uri}/${id}/fiscales`);
  }
}

export const CasoResource = new Caso();
