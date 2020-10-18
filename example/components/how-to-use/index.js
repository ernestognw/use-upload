import { useState } from 'react';
import { Box, Typography, List, Tab, Button, Alert } from 'blockdemy-ui';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { graphql, s3, rest } from './scripts';

const { ListItem, ListItemText } = List;
const { Tabs } = Tab;

const HowToUse = () => {
  const [howToUse, setHowToUse] = useState('REST');

  return (
    <Box my={20} id="how-to-use">
      <Typography variant="h2">How to use</Typography>
      <Typography>
        In order to use this hook, you must need to create an API endpoint to retrieve a presigned
        url. These are the most common cloud storage services you can use with this feature:
      </Typography>
      <Box my={20}>
        <List>
          <ListItem>
            <ListItemText
              style={{ padding: 0 }}
              primary="AWS"
              secondary="Uploading objects using presigned URLs"
            />
            <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/PresignedUrlUploadObject.html">
              <Button as="a" variant="soft" color="primary">
                Docs
              </Button>
            </a>
          </ListItem>
          <ListItem>
            <ListItemText style={{ padding: 0 }} primary="Google Cloud" secondary="Signed URLs" />
            <a href="https://cloud.google.com/storage/docs/access-control/signed-urls">
              <Button as="a" variant="soft" color="primary">
                Docs
              </Button>
            </a>
          </ListItem>
        </List>
      </Box>
      <Typography>
        This is an example of how to create an s3 instance using{' '}
        <Typography as="code" color="primary">
          aws-sdk
        </Typography>{' '}
        in NodeJS:
        <Typography variant="muted">AWS S3 Setup</Typography>
        <Box as={SyntaxHighlighter} mt={5} language="graphql">
          {s3}
        </Box>
      </Typography>
      <Typography>
        Here&apos;s an example of how to generate a pre-signed URL using AWS on both types of APIs
        on NodeJS
      </Typography>
      <Alert
        type="warning"
        primary="Note that these are just examples"
        secondary="The endpoints are the ideal use case that fits with the hook defaults, but they're also configurables depending on the case"
      />
      <Tabs>
        <Tab active={howToUse === 'REST'} onClick={() => setHowToUse('REST')}>
          REST
        </Tab>
        <Tab active={howToUse === 'graphql'} onClick={() => setHowToUse('graphql')}>
          Graphql
        </Tab>
      </Tabs>
      <Box my={10}>
        {howToUse === 'graphql' && (
          <>
            <Typography variant="muted">Type Definition</Typography>
            <Box as={SyntaxHighlighter} mt={5} language="graphql">
              {graphql.typeDef}
            </Box>
            <Typography variant="muted">Resolver</Typography>
            <Box as={SyntaxHighlighter} mt={5} language="javascript">
              {graphql.resolver}
            </Box>
          </>
        )}
        {howToUse === 'REST' && (
          <>
            <Typography variant="muted">Express endpoint</Typography>
            <Box as={SyntaxHighlighter} mt={5} language="javascript">
              {rest}
            </Box>
          </>
        )}
      </Box>
      <Typography>
        Once you have the API endpoint working endpoint, then, you can use any of the examples
        listed previously
      </Typography>
    </Box>
  );
};

export default HowToUse;
