import Resource from './resource';

export default class Viaje extends Resource {
  constructor() {
    super('viajes');
  }
}

export const ViajeResource = new Viaje();
