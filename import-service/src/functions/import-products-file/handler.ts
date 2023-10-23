import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import { APIGatewayProxyEvent } from 'aws-lambda';

export const importProductsFile = async (event: APIGatewayProxyEvent) => {
  const fileName = event.queryStringParameters.name;
  if (!fileName) {
    return formatJSONResponse(
      {
        message: 'Filename is required as a query parameter.',
      },
      400
    );
  }

  const s3Params = {
    Bucket: 'shop-aws-import-bucket',
    Key: `uploaded/${fileName}`,
    Expires: 60, // This URL will be valid for 60 seconds
    ContentType: 'text/csv',
  };

  const s3 = new AWS.S3({ region: 'eu-north-1' });

  let signedUrl;
  try {
    signedUrl = s3.getSignedUrl('putObject', s3Params);
  } catch (error) {
    console.error('Error creating signed URL:', error);
    return formatJSONResponse(
      {
        message: 'Internal Server Error.',
      },
      500
    );
  }
  return formatJSONResponse({
    signedUrl: signedUrl,
  });
};

export const main = middyfy(importProductsFile);
