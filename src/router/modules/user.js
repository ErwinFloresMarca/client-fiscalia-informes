/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout';

const UsersRouter = {
  path: '/users',
  component: Layout,
  redirect: '/users/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/user'),
      name: 'AdminUsers',
      meta: { title: 'Usuarios', icon: 'user', permissions: ['ViewUser'], affix: false, noCache: true },
    },
    {
      path: 'new',
      component: () => import('@/views/user/NewUser'),
      name: 'NewUser',
      hidden: true,
      meta: { title: 'Nuevo Usuario', permissions: ['CreateUser'], affix: false, noCache: false },
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/user/EditUser'),
      name: 'EditUser',
      hidden: true,
      meta: { title: 'Editar Usuario', permissions: ['UpdateUser'], affix: false, noCache: false },
    },
  ],
};

export default UsersRouter;
