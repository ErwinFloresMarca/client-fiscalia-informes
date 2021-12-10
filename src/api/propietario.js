import Resource from './resource';
import ResourceRelation from './resourceRelation';

export default class Propietario extends Resource {
  constructor() {
    super('propietarios');
  }
  Dispositivo(id) {
    return new ResourceRelation(`propietarios/${id}/dispositivos`);
  }
}

export const PropietarioResource = new Propietario();
