import { FromSchema } from 'json-schema-to-ts';

const productSchema = {
  title: 'Product',
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
  },
  required: ['id', 'title', 'price'],
} as const;

export type Product = FromSchema<typeof productSchema>;

export default productSchema;
