<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="activeMenu" router>
          <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">
            {{ item.meta.title }}
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import Header from './components/Header.vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const menuList = router.getRoutes().filter((route) => {
  return route.meta.isShow;
});
const activeMenu = route.path;
</script>
<style lang="less" scoped>
.el-header {
  padding: 0;
  margin-bottom: 5px;
}

.el-container {
  height: 100%;

  .el-menu {
    height: 100%;
  }
}
</style>
