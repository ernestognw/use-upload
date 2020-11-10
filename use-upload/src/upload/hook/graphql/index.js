import { useState } from 'react';
import axios from 'axios';
import { defaults } from '../../utils';

const defaultOptions = {
  apolloClient: undefined,
  ...defaults,
};

const useGraphqlUpload = (querySignedUrl, options = defaultOptions) => {
  const finalOptions = {
    ...defaultOptions,
    ...options,
    resultPath: { ...defaultOptions.resultPath, ...options?.resultPath },
    uploadFileOptions: {
      ...defaultOptions.uploadFileOptions,
      ...options?.uploadFileOptions,
    },
  };

  const {
    apolloClient,
    resultPath: { root, fileUrl, signedUrl },
    uploadFileOptions,
  } = finalOptions;

  if (!querySignedUrl) {
    throw new Error('querySignedUrl is required');
  }

  if (!apolloClient?.query) {
    throw new Error('The client provided is not a valid apollo client');
  }

  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const upload = async (file, { variables = {}, ...uploadOptions }) => {
    setUploading(true);

    const { data } = await apolloClient.query({
      query: querySignedUrl,
      variables,
      ...uploadOptions,
    });

    if (!data[root]) {
      throw new Error(
        `result.data.${root} is ${data[root]}. Please verify that provided root is valid for the given querySignedUrl`
      );
    }

    await axios({
      url: data[root][signedUrl],
      data: file,
      ...uploadFileOptions,
      onUploadProgress: (progressEvent) => {
        const newProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(newProgress);
      },
      headers: {
        'Content-Type': file.type,
        ...uploadFileOptions?.headers,
      },
    });

    setUploading(false);
    return data[root][fileUrl];
  };

  const reset = () => {
    setProgress(0);
  };

  return { upload, progress, uploading, reset };
};

export default useGraphqlUpload;
