/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout';

const TipoDispositivosRouter = {
  path: '/tipo-dispositivos',
  component: Layout,
  redirect: '/tipo-dispositivos/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/tipoDispositivo'),
      name: 'AdminTipoDispositivos',
      meta: { title: 'Tipos de Dispositivo', icon: 'device', permissions: ['ViewInFoto'], affix: true, noCache: true },
    },
    {
      path: 'new',
      component: () => import('@/views/tipoDispositivo/NewTipoDispositivo'),
      name: 'NewTipoDispositivo',
      hidden: true,
      meta: { title: 'Nuevo Tipo de Dispositivo', permissions: ['CreateInFoto'], affix: false, noCache: true },
    },
    // {
    //   path: 'edit/:id',
    //   component: () => import('@/views/user/EditUser'),
    //   name: 'EditUser',
    //   hidden: true,
    //   meta: { title: 'Editar Usuario', permissions: ['UpdateUser'], affix: false, noCache: true },
    // },
  ],
};

export default TipoDispositivosRouter;
