import Resource from './resource';
import ResourceRelation from './resourceRelation';
export default class Fiscal extends Resource {
  constructor() {
    super('fiscales');
  }
  Caso(id) {
    return new ResourceRelation(`fiscales/${id}/casos`);
  }
}

export const FiscalResource = new Fiscal();
