import { FromSchema } from 'json-schema-to-ts';

const availableProductSchema = {
  title: 'Product',
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
    count: { type: 'number' },
  },
  required: ['id', 'title', 'price', 'count'],
} as const;

export type AvailableProduct = FromSchema<typeof availableProductSchema>;

export default availableProductSchema;
