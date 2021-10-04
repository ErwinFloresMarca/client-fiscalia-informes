/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout';

const NoticiasRouter = {
  path: '/admin_noticias',
  component: Layout,
  redirect: '/admin_noticias/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/noticia'),
      name: 'AdminNoticias',
      meta: { title: 'Noticias', icon: 'form', permissions: ['ManageNoticias'], affix: true, noCache: true },
    },
    {
      path: 'new',
      component: () => import('@/views/noticia/NuevaNoticia'),
      name: 'NewNoticia',
      hidden: true,
      meta: { title: 'Nueva Noticia', permissions: ['ManageNoticias'], affix: false, noCache: true },
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/noticia/EditNoticia'),
      name: 'EditNoticia',
      hidden: true,
      meta: { title: 'Editar Noticia', permissions: ['ManageNoticias'], affix: false, noCache: true },
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

export default NoticiasRouter;
