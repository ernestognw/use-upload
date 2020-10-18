import React, { useState } from 'react';
import { useRestUpload } from 'use-upload';

const Rest = () => {
  const [url, setUrl] = useState('');
  const { upload, progress, uploading, reset } = useRestUpload(
    'https://run.mocky.io/v3/b09ca35e-a3e7-49f4-ba2b-fe3ea812b611'
  );

  const onFileChange = async (event) => {
    const [file] = event.target.files;
    const fileUrl = await upload(file, { body: { fileName: file.name, fileType: file.type } });
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
