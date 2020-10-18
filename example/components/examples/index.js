/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable import/extensions */
import { useState } from 'react';
import { Box, Typography, Tab, Alert } from 'blockdemy-ui';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Rest from './rest';
import RestText from '!raw-loader!./rest';
import Graphql from './graphql';
import GraphqlText from '!raw-loader!./graphql.js';

const { Tabs } = Tab;

const Examples = () => {
  const [example, setExample] = useState('REST');

  return (
    <Box my={30}>
      <Typography variant="h2">Examples</Typography>
      <Alert
        type="warning"
        primary="Examples rely on a JSON mock service"
        secondary="The example is built on top of mocky.io, and they have a low memory limit for requests, so it can hang with medium size files. I couldn't find any better, but let me know if you have an alternative :)"
      />
      <Tabs>
        <Tab active={example === 'REST'} onClick={() => setExample('REST')}>
          REST
        </Tab>
        <Tab active={example === 'graphql'} onClick={() => setExample('graphql')}>
          Graphql
        </Tab>
      </Tabs>
      <Box my={10}>
        {example === 'graphql' && (
          <>
            <Typography variant="muted">Working example:</Typography>
            <Box p={10} bg="light">
              <Graphql />
            </Box>
            <Typography mt={10} variant="muted">
              Code:
            </Typography>
            <Box as={SyntaxHighlighter} mt={5} language="graphql">
              {GraphqlText}
            </Box>
          </>
        )}
        {example === 'REST' && (
          <>
            <Typography variant="muted">Working example:</Typography>
            <Box p={10} bg="light">
              <Rest />
            </Box>
            <Typography mt={10} variant="muted">
              Code:
            </Typography>
            <Box as={SyntaxHighlighter} mt={5} language="graphql">
              {RestText}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Examples;
