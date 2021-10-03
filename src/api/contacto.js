import Resource from './resource';

export default class Contacto extends Resource {
  constructor() {
    super('contactos');
  }
}

export const ContactoResource = new Contacto();
