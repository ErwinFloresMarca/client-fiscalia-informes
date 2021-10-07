
export const uploadFileUrl = () => {
  return process.env.VUE_APP_BASE_API + '/files';
};

export const downloadFuleUrl = (fileName) => {
  return process.env.VUE_APP_BASE_API + 'files/' + fileName;
};
