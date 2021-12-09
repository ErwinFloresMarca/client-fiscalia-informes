import Resource from './resource';

export default class Propietario extends Resource {
  constructor() {
    super('propietarios');
  }
  Dispositivo(id) {
    return new Resource(`propietarios/${id}/dispositivos`);
  }
}

export const PropietarioResource = new Propietario();
