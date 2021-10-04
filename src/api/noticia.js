import Resource from './resource';

export default class Noticia extends Resource {
  constructor() {
    super('noticias');
  }
}

export const NoticiaResource = new Noticia();
