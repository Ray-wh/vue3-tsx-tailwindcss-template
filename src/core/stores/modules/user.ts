import { defineStore } from 'pinia';
import type { UserInfo } from '../types';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null as UserInfo | null,
    token: '',
  }),
  actions: {
    login(userInfo: UserInfo, token: string) {
      this.userInfo = userInfo;
      this.token = token;
    },
    logout() {
      this.userInfo = null;
      this.token = '';
    },
  },
  persist: true,
});
