import request from '@/utils/request';

/**
 * Simple RESTful resource class
 */
class Resource {
  constructor(uri) {
    this.uri = uri;
  }
  list(query) {
    return request({
      url: '/' + this.uri,
      method: 'get',
      params: { filter: query },
    });
  }
  get(id, query) {
    return request({
      url: '/' + this.uri + '/' + id,
      method: 'get',
      params: { filter: query },
    });
  }
  count(query) {
    return request({
      url: '/' + this.uri + '/count',
      method: 'get',
      params: { where: query },
    });
  }
  store(resource) {
    return request({
      url: '/' + this.uri,
      method: 'post',
      data: resource,
    });
  }
  update(id, resource) {
    return request({
      url: '/' + this.uri + '/' + id,
      method: 'patch',
      data: resource,
    });
  }
  destroy(id) {
    return request({
      url: '/' + this.uri + '/' + id,
      method: 'delete',
    });
  }
}

export { Resource as default };
