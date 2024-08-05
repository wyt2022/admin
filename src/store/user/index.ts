import { defineStore } from 'pinia';
import { UserState } from './types';
import pinia from '@/store';
import { userLogin } from '@/api/user';

export const useUserStoreHook = defineStore('userInfo', {
  state: () => ({
    username: '',
    accessToken: '',
    refreshToken: '',
    roles: [] as string[]
  }),
  getters: {},
  actions: {
    // 用于更新store数据
    // UserState为定义好的state类型
    updateInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },
    // 用户登录
    storeUserLogin(data) {
      return userLogin(data).then((res) => {
        this.username = res.username;
        this.roles = res.roles;
        this.accessToken = res.accessToken;
        return res;
      });
    }
  },
  // 持久化保存 accessToken
  persist: {
    key: 'userInfo',
    storage: sessionStorage,
    paths: ['accessToken', 'username']
  }
});

// 导出该Store
export function useUserStore() {
  return useUserStoreHook(pinia);
}
