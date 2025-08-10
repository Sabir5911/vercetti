import { type SchemaTypeDefinition } from 'sanity'
import { productType } from '../../../schemaTypes/productType'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType],
}
