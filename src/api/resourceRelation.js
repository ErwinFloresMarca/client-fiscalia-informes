import request from '@/utils/request';

/**
 * Simple RESTful resource class
 */
class ResourceRelation {
  constructor(uri) {
    this.uri = uri;
  }
  list(filter) {
    return request({
      url: '/' + this.uri,
      method: 'get',
      params: { filter: filter },
    });
  }
  store(resource) {
    return request({
      url: '/' + this.uri,
      method: 'post',
      data: resource,
    });
  }
  update(resource, where) {
    return request({
      url: '/' + this.uri,
      method: 'patch',
      data: resource,
      params: { where: where },
    });
  }
  destroy(where) {
    return request({
      url: '/' + this.uri,
      method: 'delete',
      params: { where: where },
    });
  }
}

export { ResourceRelation as default };
