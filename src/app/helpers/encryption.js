import * as AWS from '@aws-sdk/client-s3';

export const getEncryptedText = (secretMessage) => {
  const client = new AWS.S3({ region: 'REGION' });

  console.log(client, 'client');
};
