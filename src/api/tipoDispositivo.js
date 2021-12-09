import Resource from './resource';

export default class TipoDispositivo extends Resource {
  constructor() {
    super('tipo-dispositivos');
  }
  Dispositivos(id) {
    return new Resource(`informe-fotografico/${id}/dispositivos`);
  }
}

export const TipoDispositivoResource = new TipoDispositivo();
