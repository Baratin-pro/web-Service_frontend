import { User } from '@/models/user.model';

const state = {
  user: undefined as (User | undefined),
};
type UserState = typeof state;

export const userStore = {
  state,
  mutations: {
    setUser(state: UserState, payload: User) {
      state.user = payload;
    },
  },
  getters: {
    user: (state: UserState) => {
      return state.user;
    },
  }
};