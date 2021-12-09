import request from '@/utils/request';

export const getListFoto = (folderDir) => {
  return request({
    url: `/files-reader`,
    method: 'GET',
    params: { folderDir: folderDir },
  });
};

export const downloadFotoUrl = (fileName, folderDir = false) => {
  return process.env.VUE_APP_BASE_API + '/files-reader/' + fileName + (folderDir ? `?folderDir=${encodeURIComponent(folderDir)}` : '');
};

export const generateOnlyFotoUrl = (fileName, folderDir) => {
  return fileName + `?folderDir=${encodeURIComponent(folderDir)}`;
};

