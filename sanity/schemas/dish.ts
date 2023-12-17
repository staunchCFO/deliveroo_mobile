import {defineType, defineArrayMember} from 'sanity'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default defineType({
  title: 'Dish',
  name: 'dish',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name of dish',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short description',
      validation: (Rule) => Rule.max(200)
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price of Dish in USD',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image of the Dish',
    },
  ],
})
