import { ProductCreate } from '@libs/types/product';
import * as yup from 'yup';

const productCreateValidationSchema = yup.object().shape({
  title: yup.string().required(),
  price: yup.number().moreThan(0).required(),
  description: yup.string().nullable(),
  count: yup.number().integer().required(),
});

export class ProductValidatorService {
  async validate(productCreate: ProductCreate) {
    await productCreateValidationSchema.validate(productCreate);
  }
}
