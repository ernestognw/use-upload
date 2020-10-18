// import { useRestUpload } from '../../use-upload';
import { Box, Typography } from 'blockdemy-ui';
import hookConfig from '../../use-upload/package.json';
import HowToUse from '../components/how-to-use/index';
import Examples from '../components/examples/index';

const toCamel = (str) =>
  str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });

const Index = () => {
  const { name, description, repository = {}, author = {} } = hookConfig;

  const { name: authorName, url: authorUrl } = author;

  const { url: repositoryUrl } = repository;
  const repositoryExists = typeof repositoryUrl === 'string';

  const repositoryUrlDisplay = repositoryExists && repositoryUrl.split('://')[1];

  return (
    <>
      <Box as="main">
        <Box as="section" maxWidth={700} mx="auto" p="1em">
          <Box my={20}>
            <Typography variant="h1">{toCamel(name)}</Typography>
            <Typography>{description}</Typography>
            {repositoryExists && (
              <Typography as="a" color="primary" href={repositoryUrl}>
                {repositoryUrlDisplay}
              </Typography>
            )}
          </Box>
          <Examples />
          <HowToUse />
        </Box>
        <Box maxWidth={700} mx="auto" p="1em" a>
          <Typography variant="muted">
            Made by <a href={authorUrl}>{authorName}</a>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Index;
