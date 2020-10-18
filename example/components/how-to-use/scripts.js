const graphql = {
  typeDef: `type SignedFileUrl {
  signedUrl: String!
  fileUrl: String!
}

type Query {
  signFileUrl(filePath: String!, fileType: String!): SignedFileUrl!
}`,
  resolver: `import s3 from 'path/to/s3/file';

const signFileUrl = async (_, { filePath, fileType }) => {
  const signedUrl = await s3.getSignedUrlPromise('putObject', {
    Bucket: '<YOUR-S3-BUCKET>',
    Key: filePath,
    Expires: 500, // To prevent future unauthorized uses of URL
    ContentType: fileType,
    ACL: 'public-read'
  });

  return {
    signedUrl,
    fileUrl: signedUrl.split(
      // After file path, there is always this param
      // which is assumed constant.
      // This split will left the final file URL
      '?X-Amz-Algorithm='
    )[0]
  };
 }`,
};

const s3 = `import AWS from 'aws-sdk';

AWS.config.update({
  region: '<YOUR-REGION>', // Put your aws region here
  accessKeyId: '<YOUR-ACCESS-KEY-ID>',
  secretAccessKey: '<YOUR-SECRET-ACCESS-KEY>'
});
    
const s3 = new AWS.S3();

export default s3;`;

const rest = `import s3 from 'path/to/s3/file';
import express from 'express';

const app = express();

app.get('/<YOUR-ENDPOINT>', (req, res) => {
  const { filePath, fileType } = req;

  const signedUrl = await s3.getSignedUrlPromise('putObject', {
    Bucket: '<YOUR-S3-BUCKET>',
    Key: filePath,
    Expires: 500, // To prevent future unauthorized uses of URL
    ContentType: fileType,
    ACL: 'public-read'
  });

  res.send({
    signedUrl,
    fileUrl: signedUrl.split(
      // After file path, there is always this param
      // which is assumed constant.
      // This split will left the final file URL
      '?X-Amz-Algorithm='
    )[0]
  });
})`;

export { graphql, s3, rest };
