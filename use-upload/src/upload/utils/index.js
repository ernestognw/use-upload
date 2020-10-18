const defaults = {
  uploadFileOptions: {
    method: 'put',
  },
  resultPath: {
    root: 'signFileUrl', // Note that this is not used in REST hook
    fileUrl: 'fileUrl',
    signedUrl: 'signedUrl',
  },
};

export { defaults };
