import Resource from './resource';

export default class Fiscal extends Resource {
  constructor() {
    super('fiscales');
  }
  Caso(id) {
    return new Resource(`/fiscales/${id}/casos`);
  }
}

export const FiscalResource = new Fiscal();
