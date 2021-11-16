/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout';

const InformesFotograficosRouter = {
  path: '/informes-fotograficos',
  component: Layout,
  redirect: '/informes-fotograficos/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/informeFotografico'),
      name: 'AdminInformesFotograficos',
      meta: { title: 'Informes Fotograficos', icon: 'excel', permissions: ['ViewInFoto'], affix: true, noCache: true },
    },
    {
      path: 'new',
      component: () => import('@/views/informeFotografico/NewInformeFotografico'),
      name: 'NewInformeFotografico',
      hidden: true,
      meta: { title: 'Nuevo Informe Fotografico', permissions: ['CreateInFoto'], affix: false, noCache: true },
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

export default InformesFotograficosRouter;
