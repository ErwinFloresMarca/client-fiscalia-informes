/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout';

const FiscalRouter = {
  path: '/fiscales',
  component: Layout,
  redirect: '/fiscales/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/fiscal'),
      name: 'AdminFiscales',
      meta: { title: 'Fiscales', icon: 'peoples', permissions: ['ViewInFoto'], affix: false, noCache: true },
    },
    {
      path: 'new',
      component: () => import('@/views/fiscal/NewFiscal'),
      name: 'NewFiscal',
      hidden: true,
      meta: { title: 'Nuevo Fiscal', permissions: ['CreateInFoto'], affix: false, noCache: false },
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/fiscal/EditFiscal'),
      name: 'EditFiscal',
      hidden: true,
      meta: { title: 'Editar Fiscal', permissions: ['UpdateInFoto'], affix: false, noCache: false },
    },
  ],
};

export default FiscalRouter;
