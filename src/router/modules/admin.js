/* Layout */
import Layout from '@/layout';

export const adminRoutes = [
  {
    path: '/admin',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Panel de Control', icon: 'dashboard', affix: true },
      },
    ],
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Perfil', icon: 'user', noCache: true },
      },
    ],
  },
]
;
