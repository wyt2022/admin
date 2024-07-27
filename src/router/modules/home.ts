import { RouteRecordRaw } from 'vue-router';

export default {
  path: '/',
  name: 'homePage',
  component: () => import('@/views/home/index.vue'),
  meta: { title: '首页' },
  children: []
} as RouteRecordRaw;
