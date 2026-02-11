import { defineStore } from 'pinia';

export interface UserInfo {
  id: number;
  username: string;
  email: string;
  role: string;
  isAdmin: boolean;
  isActive: boolean;
}

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
