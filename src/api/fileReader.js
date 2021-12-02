import request from '@/utils/ewquest';

export const getListFoto = (fileDir) => {
  return request({
    url: `/files-reader`,
    method: 'GET',
    params: { fileDir: fileDir },
  });
};

export const downloadFotoUrl = (fileName, fileDir) => {
  return process.env.VUE_APP_BASE_API + '/files-reader/' + fileName + `?fileDir=${encodeURIComponent(fileDir)}`;
};

