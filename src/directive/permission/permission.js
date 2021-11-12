import store from '@/store';

function checkPermission(el, binding) {
  const { value } = binding;
  const havePermissions = store.getters && store.getters.permissions;

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const needPermissions = value;

      const hasPermission = havePermissions.some(role => {
        return needPermissions.includes(role);
      });

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  } else {
    throw new Error(`need permissions! Like v-permission="['CreateUser','UpdateUser']"`);
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding);
  },
  update(el, binding) {
    checkPermission(el, binding);
  },
};
