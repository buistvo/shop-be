const dbConfig = {
  Resources: {
    ProductsTable: {
      Type: 'AWS::DynamoDB::Table',
      Properties: {
        TableName: 'products',
        AttributeDefinitions: [
          {
            AttributeName: 'id',
            AttributeType: 'S',
          },
        ],
        KeySchema: [
          {
            AttributeName: 'id',
            KeyType: 'HASH',
          },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    },
    StockTable: {
      Type: 'AWS::DynamoDB::Table',
      Properties: {
        TableName: 'stocks',
        AttributeDefinitions: [
          {
            AttributeName: 'product_id',
            AttributeType: 'S',
          },
        ],
        KeySchema: [
          {
            AttributeName: 'product_id',
            KeyType: 'HASH',
          },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    },
  },
};
export default dbConfig;
