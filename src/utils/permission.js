import store from '@/store';

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const havePermissions = store.getters && store.getters.permissions;
    const needPermissions = value;

    const hasPermission = havePermissions.some(role => {
      return needPermissions.includes(role);
    });
    return hasPermission;
  } else {
    console.error(`need permissions! Like v-permission="['admin','editor']"`);
    return false;
  }
}
