import React, { useState } from 'react';
import { useRestUpload } from 'use-upload';

const Rest = () => {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const { upload, progress, uploading, reset } = useRestUpload(
    'http://use-upload.free.beeceptor.com/rest/signFileUrl'
  );

  const onFileChange = async (event) => {
    const [file] = event.target.files;
    if (file.size > 1000000) {
      setMessage('Sorry, but beeceptor API mock only works with files under 1 MB');
      return;
    }
    const fileUrl = await upload(file, { body: { filePath: file.name, fileType: file.type } });
    setUrl(fileUrl);
  };

  return (
    <>
      {uploading && <span>uploading...</span>}
      <input max-size="1024" disabled={uploading} onChange={onFileChange} type="file" />
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
      {message && <p>{message}</p>}
    </>
  );
};

export default Rest;
