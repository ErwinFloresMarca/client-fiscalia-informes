
export const uploadFileUrl = () => {
  return process.env.VUE_APP_BASE_API + '/files';
};

export const downloadFileUrl = (fileName) => {
  return process.env.VUE_APP_BASE_API + 'files/' + fileName;
};
