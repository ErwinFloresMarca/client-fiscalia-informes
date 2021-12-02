import { UserResource } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { resetRouter } from '@/router';

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  ci: '',
  id: '',
  permissions: [],
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_CI: (state, ci) => {
    state.ci = ci;
  },
  SET_ID: (state, id) => {
    state.id = id;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { ci, password } = userInfo;
    return new Promise((resolve, reject) => {
      UserResource.login({ ci: ci.trim(), password: password }).then(response => {
        const { data } = response;
        setToken(data.token);
        commit('SET_TOKEN', data.token);
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      UserResource.getAuthUser().then(response => {
        const { data } = response;

        if (!data) {
          reject('Verification failed, please Login again.');
        }

        const { permissions, name, avatar, ci, id } = data;

        // permissions must be a non-empty array
        if (!permissions || permissions.length <= 0) {
          reject('getInfo: permissions must be a non-null array!');
        }

        commit('SET_PERMISSIONS', permissions);
        commit('SET_NAME', name);
        commit('SET_AVATAR', avatar);
        commit('SET_CI', ci);
        commit('SET_ID', id);
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '');
      commit('SET_PERMISSIONS', []);
      removeToken();
      resetRouter();

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true });

      resolve();
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      commit('SET_PERMISSIONS', []);
      removeToken();
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
