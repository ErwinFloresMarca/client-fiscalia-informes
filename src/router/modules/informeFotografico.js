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
    {
      path: 'view/:id',
      component: () => import('@/views/informeFotografico/ViewInformeFotografico'),
      name: 'ViewInformeFotografico',
      hidden: true,
      meta: { title: 'Vista Informe Fotografico', permissions: ['ViewInFoto', 'UpdateInFoto'], affix: false, noCache: true },
    },
  ],
};

export default InformesFotograficosRouter;
