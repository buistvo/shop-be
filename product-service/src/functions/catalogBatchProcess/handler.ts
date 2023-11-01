import { ProductDataService } from '@libs/services/product-data-service';
import { ProductValidatorService } from '@libs/services/product-validator-service';
import { PriceType } from '@libs/types/prictType.enum';
import { ProductCreate } from '@libs/types/product';
import middy from '@middy/core';
import { SQSEvent } from 'aws-lambda';
import * as AWS from 'aws-sdk';

export const catalogBatchProcess = async (event: SQSEvent) => {
  const sns = new AWS.SNS();

  for (const message of event.Records) {
    try {
      console.log('received new message', message.body);
      const product = JSON.parse(message.body) as ProductCreate;
      try {
        await new ProductValidatorService().validate(product);
      } catch (validationError) {
        console.error('Validation error:', validationError.errors);
      }
      console.log('creating product...', product);
      const created = await new ProductDataService().createProduct(product);
      console.log('product created', created);
      const snsMessage = {
        TopicArn: process.env.SNS_TOPIC_ARN,
        Message: `New product created: ${JSON.stringify(created)}`,
        Subject: 'New Product Created',
        MessageAttributes: {
          priceType: {
            DataType: 'String',
            StringValue:
              created.price > 1000 ? PriceType.Luxury : PriceType.Basic,
          },
        },
      };
      await sns.publish(snsMessage).promise();
    } catch (error) {
      console.error('Unhandled error', error);
    }
  }
};

export const main = middy(catalogBatchProcess);
