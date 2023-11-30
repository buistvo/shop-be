import type { AWS } from '@serverless/typescript';

import { importFileParser, importProductsFile } from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-north-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          's3:GetObject',
          's3:PutObject',
          's3:CopyObject',
          's3:DeleteObject',
        ],
        Resource: 'arn:aws:s3:::shop-aws-import-bucket/*',
      },
      {
        Effect: 'Allow',
        Action: ['sqs:SendMessage'],
        Resource: 'arn:aws:sqs:eu-north-1:979116953403:catalogItemsQueue',
      },
    ],
    httpApi: {
      cors: {
        allowCredentials: true,
        allowedOrigins: ['https://d16pd4ocp5ok6l.cloudfront.net'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        allowedMethods: ['OPTIONS', 'POST', 'GET'],
      },
    },
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      ImportBucket: {
        Type: 'AWS::S3::Bucket',
        Properties: {
          BucketName: 'shop-aws-import-bucket',
          CorsConfiguration: {
            CorsRules: [
              {
                AllowedHeaders: ['*'],
                AllowedMethods: ['GET', 'PUT', 'POST'],
                AllowedOrigins: ['*'],
              },
            ],
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
