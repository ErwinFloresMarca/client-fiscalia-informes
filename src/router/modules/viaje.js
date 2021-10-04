/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout';

const ViajesRouter = {
  path: '/admin_viajes',
  component: Layout,
  redirect: '/admin_viajes/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/viaje'),
      name: 'AdminViajes',
      meta: { title: 'Viajes', icon: 'form', permissions: ['ManageUltimosViajes'], affix: true, noCache: true },
    },
    {
      path: 'new',
      component: () => import('@/views/viaje/NuevoViaje'),
      name: 'NewViaje',
      hidden: true,
      meta: { title: 'Nuevo Viaje', permissions: ['ManageUltimosViajes'], affix: false, noCache: true },
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/viaje/EditViaje'),
      name: 'EditViaje',
      hidden: true,
      meta: { title: 'Editar Viaje', permissions: ['ManageUltimosViajes'], affix: false, noCache: true },
    },
    // {
    //   path: 'show/:id',
    //   component: () => import('@/views/contacto/ShowContacto'),
    //   name: 'ShowContacto',
    //   hidden: true,
    //   meta: { title: 'Contacto', permissions: ['ManageContacto'], affix: false, noCache: true },
    // },
  ],
};

export default ViajesRouter;
