import { useState } from 'react';
import axios from 'axios';
import { defaults } from '../../utils';

const defaultOptions = {
  getSignedUrlOptions: {
    method: 'get',
  },
  ...defaults,
};

const useRestUpload = (signedUrlEndpoint, options = defaultOptions) => {
  const finalOptions = {
    resultPath: { ...defaultOptions.resultPath, ...options?.resultPath },
    getSignedUrlOptions: {
      ...defaultOptions.getSignedUrlOptions,
      ...options?.getSignedUrlOptions,
    },
    uploadFileOptions: {
      ...defaultOptions.uploadFileOptions,
      ...options?.uploadFileOptions,
    },
  };

  const {
    resultPath: { fileUrl, signedUrl },
    uploadFileOptions,
    getSignedUrlOptions,
  } = finalOptions;

  if (!signedUrlEndpoint) {
    throw new Error('signedUrlEndpoint is required');
  }

  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const upload = async (file, { body = {}, ...uploadOptions }) => {
    setUploading(true);

    const { data } = await axios({
      method: 'get',
      url: signedUrlEndpoint,
      ...getSignedUrlOptions,
    });

    if (!data || !data[fileUrl] || !data[signedUrl]) {
      throw new Error(
        `The data returned from ${signedUrlEndpoint} doesn't match the expected format: { ${fileUrl}: '...', ${signedUrl}: '...' }`
      );
    }

    await axios({
      url: data[signedUrl],
      data: file,
      body,
      ...uploadFileOptions,
      onUploadProgress: (progressEvent) => {
        const newProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(newProgress);
      },
      headers: {
        'Content-Type': file.type,
        ...uploadFileOptions?.headers,
      },
      ...uploadOptions,
    });

    setUploading(false);
    return data[fileUrl];
  };

  const reset = () => {
    setProgress(0);
  };

  return { upload, progress, uploading, reset };
};

export default useRestUpload;
