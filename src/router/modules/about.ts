import { RouteRecordRaw } from 'vue-router';

export default {
  path: '/about',
  name: 'aboutPage',
  component: () => import('@/views/about/index.vue'),
  meta: {
    title: '关于'
  },
  children: []
} as RouteRecordRaw;
