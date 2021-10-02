/** When your routing table is too long, you can split it into small modules**/

import LayoutWeb from '@/layoutWeb';

const webRouter = {
  path: '/',
  component: LayoutWeb,
  redirect: '/home',
  name: 'Web',
  hidden: true,
  children: [
    {
      path: 'home',
      component: () => import('@/views/publicWeb/HomePage'),
      name: 'Home',
      meta: { title: 'Inicio', noCache: true },
    },
    {
      path: 'contactanos',
      component: () => import('@/views/publicWeb/Contactanos'),
      name: 'Contactanos',
      meta: { title: 'Contáctanos', noCache: true },
    },
    {
      path: 'comunicados',
      component: () => import('@/views/publicWeb/comunicados'),
      name: 'Comunicados',
      redirect: '/comunicados/ultimos_viajes',
      meta: { title: 'Comunicados', noCache: true },
      children: [
        {
          path: '/ultimos_viajes',
          component: () => import('@/views/publicWeb/comunicados/UltimosViajes'),
          name: 'UltimosViajes',
          meta: { title: 'últimos Viajes', noCache: true },
        },
        {
          path: '/noticias',
          component: () => import('@/views/publicWeb/comunicados/Noticias'),
          name: 'Noticias',
          meta: { title: 'Noticias', noCache: true },
        },
      ],
    },
    {
      path: 'login',
      component: () => import('@/views/publicWeb/Login'),
      name: 'Login',
      meta: { title: 'Login', noCache: true },
    },
    {
      path: 'registrarse',
      component: () => import('@/views/publicWeb/Registrarse'),
      name: 'Registrarse',
      meta: { title: 'Registrarse', noCache: true },
    },
  ],
};

export default webRouter;
