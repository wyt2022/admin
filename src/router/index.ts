import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const modules: Record<string, any> = import.meta.glob(['./modules/*.ts'], {
  eager: true
});
// 配置路由
const routes: Array<RouteRecordRaw> = [];
Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default);
});
// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(), // 配置路由模式
  routes // 配置路由规则
});
router.beforeEach((to, from, next) => {
  Nprogress.start();
  next();
});
router.afterEach(() => {
  Nprogress.done();
});
export default router;
