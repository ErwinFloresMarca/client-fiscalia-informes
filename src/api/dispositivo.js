import Resource from './resource';

export default class Dispositivo extends Resource {
  constructor() {
    super('dispositivos');
  }
}

export const DispositivoResource = new Dispositivo();
