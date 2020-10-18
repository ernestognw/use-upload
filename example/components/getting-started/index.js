import { useState } from 'react';
import { Box, Typography, Tab } from 'blockdemy-ui';
import SyntaxHighlighter from 'react-syntax-highlighter';

const { Tabs } = Tab;

const GettingStarted = () => {
  const [usage, setUsage] = useState('REST');

  return (
    <Box my={20}>
      <Typography variant="h2">Getting started</Typography>
      <Typography variant="headingTitle" mt={20}>
        Installation
      </Typography>
      <Typography variant="muted">With yarn:</Typography>
      <Box as={SyntaxHighlighter} mt={5} language="bash">
        yarn add use-upload
      </Box>
      <Typography variant="muted">With npm:</Typography>
      <Box as={SyntaxHighlighter} mt={5} language="bash">
        npm install --save use-upload
      </Box>
      <Typography variant="headingTitle" mt={20}>
        Usage
      </Typography>
      <Typography>
        You will need an API endpoint that returns you a presigned URL from the storage service you
        are using. If you don&apos;t know what a presigned URL is, please go to the{' '}
        <Typography as="a" color="primary" href="/#how-to-use">
          &apos;How to use&apos;
        </Typography>{' '}
        section down below and you&apos;ll learn mopre
      </Typography>
      <Typography mt={20}>Once you have a valid endpoint, just import accordingly:</Typography>
      <Tabs>
        <Tab active={usage === 'REST'} onClick={() => setUsage('REST')}>
          REST
        </Tab>
        <Tab active={usage === 'graphql'} onClick={() => setUsage('graphql')}>
          Graphql
        </Tab>
      </Tabs>
      {usage === 'REST' && (
        <Box as={SyntaxHighlighter} mt={5} language="javascript">
          {`import { useRestUpload } from 'use-upload'`}
        </Box>
      )}
      {usage === 'graphql' && (
        <Box as={SyntaxHighlighter} mt={5} language="javascript">
          {`import { useGraphqlUpload } from 'use-upload'`}
        </Box>
      )}
      <Typography mt={20}>
        useUpload hook returns an object with 4 attributes, described as follows:
      </Typography>
      <ul>
        <Box as="li">
          <Typography>
            upload: () =&gt; String -{' '}
            <Typography as="span" variant="muted">
              Function to upload the file. It returns a string containing the final URL
            </Typography>
          </Typography>
        </Box>
        <Box as="li">
          <Typography>
            uploading: Boolean -{' '}
            <Typography as="span" variant="muted">
              Flag to show whether the file is being uploaded or not
            </Typography>
          </Typography>
        </Box>
        <Box as="li">
          <Typography>
            progress: Number -{' '}
            <Typography as="span" variant="muted">
              Progress of uploading from 0 to 100
            </Typography>
          </Typography>
        </Box>
        <Box as="li">
          <Typography>
            reset: () =&gt; void -{' '}
            <Typography as="span" variant="muted">
              Function to reset the progress
            </Typography>
          </Typography>
        </Box>
      </ul>
      <Typography mt={20}>You can use them this way:</Typography>
      {usage === 'REST' && (
        <Box as={SyntaxHighlighter} mt={5} language="javascript">
          {`const MyComponent = () => {
  const { 
    upload,
    uploading,
    progress,
    reset 
  } = useRestUpload(
    '<YOUR-ENDPOINT>', 
    { ...config }
  )

  const handleUpload = () => {
    // Config is equivalent to client.query(_, config)
    // See: https://github.com/axios/axios#request-config
    const finalUrl = await upload(file, config);
  }

  return (
    ...
  )
}`}
        </Box>
      )}
      {usage === 'graphql' && (
        <Box as={SyntaxHighlighter} mt={5} language="javascript">
          {`const MyComponent = () => {
  const { 
    upload,
    uploading,
    progress,
    reset 
  } = useGraphqlUpload(
    gqlQueryDefinition, // Using gql tag
    { 
      ...config, 
      apolloClient: <APOLLO-CLIENT-INSTANCE> // A valid apollo client instance is required
    }
  )

  const handleUpload = () => {
    // Config is equivalent to axios config
    // See: https://www.apollographql.com/docs/react/data/queries/#options
    const finalUrl = await upload(file, config);
  }

  return (
    ...
  )
}`}
        </Box>
      )}
      <Typography mt={20}>
        For more info you can refer to the{' '}
        <Typography as="a" color="primary" href="/#api-reference">
          &apos;API Reference&apos;
        </Typography>{' '}
        section
      </Typography>
    </Box>
  );
};

export default GettingStarted;
