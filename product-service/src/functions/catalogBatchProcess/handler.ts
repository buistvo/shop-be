import { ProductDataService } from '@libs/services/product-data-service';
import { ProductValidatorService } from '@libs/services/product-validator-service';
import { ProductCreate } from '@libs/types/product';
import middy from '@middy/core';
import { SQSEvent } from 'aws-lambda';

const catalogBatchProcess = async (event: SQSEvent) => {
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
    } catch (error) {
      console.error('Unhandled error', error);
    }
  }
};

export const main = middy(catalogBatchProcess);
