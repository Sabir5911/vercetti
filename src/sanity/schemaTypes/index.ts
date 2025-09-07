import { type SchemaTypeDefinition } from 'sanity'
import post from '../../../schemaTypes/post'
import feature from '../../../schemaTypes/feature'




export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post,feature],
}
