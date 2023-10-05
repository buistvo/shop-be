import type { AWS } from '@serverless/typescript';
import {
  getAvailableProductsList,
  getProductById,
  getProductsList,
} from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
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
  },
  // import the function via paths
  functions: { getProductsList, getAvailableProductsList, getProductById },
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
      ],
    },
  },
};

module.exports = serverlessConfiguration;
