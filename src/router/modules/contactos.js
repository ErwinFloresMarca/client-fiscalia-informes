/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout';

const ContactosRouter = {
  path: '/admin_contactos',
  component: Layout,
  redirect: '/admin_contactos/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/contactos/AdminContactos'),
      name: 'AdminContactos',
      meta: { title: 'Contactos', icon: 'guide', permissions: ['ManageContacto'], affix: true, noCache: true },
    },
    {
      path: 'show/:id',
      component: () => import('@/views/contactos/ShowContacto'),
      name: 'ShowContacto',
      hidden: true,
      meta: { title: 'Contacto', permissions: ['ManageContacto'], affix: false, noCache: true },
    },
  ],
};

export default ContactosRouter;
