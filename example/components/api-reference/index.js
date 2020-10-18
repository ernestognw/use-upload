import { useState } from 'react';
import { Box, Typography, Tab } from 'blockdemy-ui';
import SyntaxHighlighter from 'react-syntax-highlighter';

const { Tabs } = Tab;

const APIReference = () => {
  const [api, setApi] = useState('REST');

  return (
    <Box my={20}>
      <Typography variant="h2">API Reference</Typography>
      <Tabs>
        <Tab active={api === 'REST'} onClick={() => setApi('REST')}>
          REST
        </Tab>
        <Tab active={api === 'graphql'} onClick={() => setApi('graphql')}>
          Graphql
        </Tab>
      </Tabs>
      {api === 'REST' && (
        <>
          <Typography variant="heading" mt={20}>
            useRestUpload(urlEndpoint[, config])
          </Typography>
          <ul>
            <Box as="li">
              urlEndpoint:{' '}
              <Typography as="span" variant="muted">
                It is the URL where you will request the pre signed URL
              </Typography>
            </Box>
            <Box as="li">
              config:{' '}
              <Typography as="span" variant="muted">
                Configuration object with the following defaults:
              </Typography>
              <Box as={SyntaxHighlighter} mt={5} language="javascript">
                {`{
  // Axios config to the urlEndpoint
  // See: https://github.com/axios/axios#request-config
  getSignedUrlOptions: { 
    method: 'get',
  },
  // Axios config to put the file in the signed url
  // See: https://github.com/axios/axios#request-config
  uploadFileOptions: {
    method: 'put',
  },
  // This is the way to specify how to access urlEndpoint response
  // It is default as a recommended implementation and according
  // to the examples previously provided
  resultPath: {
    fileUrl: 'fileUrl',
    signedUrl: 'signedUrl',
  },
}`}
              </Box>
            </Box>
          </ul>
          <Typography variant="heading" mt={20}>
            Recommended urlEndpoint response schema
          </Typography>
          <Box as={SyntaxHighlighter} mt={5} language="javascript">
            {`{
  fileUrl: 'final-file-url.com',
  signedUrl: 'presigned-file-url.com?withSignatureParams=...',
}`}
          </Box>
        </>
      )}
      {api === 'graphql' && (
        <>
          <Typography variant="heading" mt={20}>
            useGraphqlUpload(querySignedUrl[, config])
          </Typography>
          <ul>
            <Box as="li">
              querySignedUrl:{' '}
              <Typography as="span" variant="muted">
                It is the{' '}
                <Typography
                  as="a"
                  variant="muted"
                  underline
                  href="https://www.apollographql.com/docs/resources/graphql-glossary/#gql-function"
                >
                  gql tag
                </Typography>{' '}
                with the query definition to retrieve the pre signed url
              </Typography>
            </Box>
            <Box as="li">
              config:{' '}
              <Typography as="span" variant="muted">
                Configuration object with the following defaults:
              </Typography>
              <Box as={SyntaxHighlighter} mt={5} language="javascript">
                {`{
  apolloClient: undefined, // REQUIRED
  // Axios config to put the file in the signed url
  // See: https://github.com/axios/axios#request-config
  uploadFileOptions: {
    method: 'put',
  },
  // This is the way to specify how to access urlEndpoint response
  // It is default as a recommended implementation and according
  // to the examples previously provided
  resultPath: {
    root: 'signFileUrl',
    fileUrl: 'fileUrl',
    signedUrl: 'signedUrl',
  },
}`}
              </Box>
            </Box>
          </ul>
          <Typography variant="heading" mt={20}>
            Recommended urlEndpoint response schema
          </Typography>
          <Box as={SyntaxHighlighter} mt={5} language="javascript">
            {`{
  signFileUrl: {
    fileUrl: 'final-file-url.com',
    signedUrl: 'presigned-file-url.com?withSignatureParams=...',
  }
}`}
          </Box>
        </>
      )}
    </Box>
  );
};

export default APIReference;
