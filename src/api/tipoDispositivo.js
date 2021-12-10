import Resource from './resource';
import ResourceRelation from './resourceRelation';

export default class TipoDispositivo extends Resource {
  constructor() {
    super('tipo-dispositivos');
  }
  Dispositivos(id) {
    return new ResourceRelation(`informe-fotografico/${id}/dispositivos`);
  }
}

export const TipoDispositivoResource = new TipoDispositivo();
