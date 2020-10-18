import React, { useState } from 'react';
import { useGraphqlUpload } from 'use-upload';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://use-upload.free.beeceptor.com/graphql/signFileUrl',
  cache: new InMemoryCache(),
});

const GET_SIGNED_URL = gql`
  query signFileUrl($filePath: String!, $fileType: String!) {
    signFileUrl(filePath: $filePath, fileType: $fileType) {
      signedUrl
      fileUrl
    }
  }
`;

const Rest = () => {
  const [url, setUrl] = useState('');
  const { upload, progress, uploading, reset } = useGraphqlUpload(GET_SIGNED_URL, {
    apolloClient: client,
  });

  const onFileChange = async (event) => {
    const [file] = event.target.files;
    const fileUrl = await upload(file, { variables: { filePath: file.name, fileType: file.type } });
    setUrl(fileUrl);
  };

  return (
    <>
      {uploading && <span>uploading...</span>}
      <input disabled={uploading} onChange={onFileChange} type="file" />
      <br />
      <progress max="100" value={progress} />
      <span>{progress}%</span>
      {progress === 100 && !uploading && (
        <>
          <p>url: {url}</p>
          <button type="button" onClick={reset}>
            Reset
          </button>
        </>
      )}
    </>
  );
};

export default Rest;
