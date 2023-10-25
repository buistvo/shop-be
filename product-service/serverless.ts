import type { AWS } from '@serverless/typescript';
import {
  catalogBatchProcess,
  createProduct,
  getAvailableProductsList,
  getProductById,
  getProductsList,
  swagger,
} from '@functions/index';
import { default as dbConfig } from './serverless.db';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-dynamodb-local',
    'serverless-offline',
    'serverless-openapi-documenter',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'eu-north-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem',
              'dynamodb:TransactWriteItems',
            ],
            Resource: 'arn:aws:dynamodb:eu-north-1:979116953403:table/stocks',
          },
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:Query',
              'dynamodb:BatchGetItem',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem',
              'dynamodb:TransactWriteItems',
            ],
            Resource: 'arn:aws:dynamodb:eu-north-1:979116953403:table/products',
          },
          {
            Effect: 'Allow',
            Action: [
              'sqs:ReceiveMessage',
              'sqs:DeleteMessage',
              'sqs:GetQueueAttributes',
            ],
            Resource: [
              {
                'Fn::GetAtt': ['SQSProductQueue', 'Arn'],
              },
            ],
          },
          {
            Effect: 'Allow',
            Action: ['sns:Publish'],
            Resource: [
              {
                Ref: 'CreateProductTopic',
              },
            ],
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: {
    getProductsList,
    getAvailableProductsList,
    getProductById,
    createProduct,
    catalogBatchProcess,
    swagger,
  },
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
    dynamodb: {
      stages: ['dev'],
      start: {
        port: '8000',
        inMemory: true,
        migrate: true,
      },
    },
    documentation: {
      version: '1.0.0',
      title: 'Products API',
      description: 'Api to get products',
      models: [
        {
          name: 'Product',
          description: 'Product',
          contentType: 'application/json',
          schema: '${file(schemas/schemas.json):definitions.Product}',
        },
        {
          name: 'ProductList',
          description: 'Available Product',
          contentType: 'application/json',
          schema:
            '${file(schemas/schemas.json):definitions.ProductListResponse}',
        },
        {
          name: 'AvailableProduct',
          description: 'AvailableProduct',
          contentType: 'application/json',
          schema: '${file(schemas/schemas.json):definitions.AvailableProduct}',
        },
        {
          name: 'AvailableProductList',
          description: 'Available Product',
          contentType: 'application/json',
          schema:
            '${file(schemas/schemas.json):definitions.AvailableProductListResponse}',
        },
        {
          name: 'ErrorResponse',
          description: 'Error Response',
          contentType: 'application/json',
          schema: '${file(schemas/schemas.json):definitions.ServerError}',
        },
        {
          name: 'ProductCreateRequest',
          description: 'Request for createProduct',
          contentType: 'application/json',
          schema: '${file(schemas/schemas.json):definitions.ProductCreate}',
        },
      ],
    },
  },
  resources: {
    Resources: {
      ...dbConfig,
      SQSProductQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'catalogItemsQueue',
        },
      },
      CreateProductTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          DisplayName: 'Product Creation Topic',
          TopicName: 'createProductTopic',
        },
      },
      EmailSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Protocol: 'email',
          TopicArn: {
            Ref: 'CreateProductTopic',
          },
          Endpoint: 'leva.doronkin@gmail.com',
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
