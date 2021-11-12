/** When your routing table is too long, you can split it into small modules**/

import LayoutWeb from '@/layoutWeb';

const webRouter = {
  path: '/',
  component: LayoutWeb,
  redirect: '/login',
  name: 'Web',
  hidden: true,
  children: [
    {
      path: 'login',
      component: () => import('@/views/publicWeb/Login'),
      name: 'Login',
      meta: { title: 'Login', noCache: true },
    },
  ],
};

export default webRouter;
