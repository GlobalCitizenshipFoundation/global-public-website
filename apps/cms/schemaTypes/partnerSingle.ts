import {defineType, defineField} from 'sanity'
import countryOptions from '../utils/countryOptions'

export const partnerSingle = defineType({
  type: 'document',
  name: 'partnersSingle',
  fields: [
    defineField({
      type: 'image',
      name: 'headerImage',
      title: 'Header Image',
      options: {hotspot: true},
    }),
    defineField({
      type: 'image',
      title: 'Logo',
      name: 'logo',
      options: {hotspot: true},
    }),
    defineField({
      type: 'string',
      name: 'country',
      title: 'Country',
      options: {
        list: countryOptions,
        layout: 'dropdown',
      },
    }),
    defineField({
      type: 'string',
      title: 'Title',
      name: 'title',
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      options: {source: 'title'},
    }),
    defineField({
      type: 'text',
      name: 'shotrDescription',
      title: 'Short Description',
    }),
    defineField({
      type: 'array',
      name: 'body',
      title: 'Body',
      of: [{type: 'block'}],
    }),
    defineField({
      type: 'string',
      title: 'Twitter',
      name: 'twitter',
    }),
    defineField({
      type: 'string',
      title: 'Instagram',
      name: 'instagram',
    }),
    defineField({
      type: 'string',
      title: 'Facebook',
      name: 'facebook',
    }),
    defineField({
      type: 'string',
      title: 'Youtube',
      name: 'youtube',
    }),
    defineField({
      type: 'string',
      title: 'LinkedIn',
      name: 'linkedin',
    }),
    defineField({
      type: 'text',
      name: 'websiteText',
      title: 'Website Text',
    }),
    defineField({
      type: 'string',
      title: 'Website Url',
      name: 'websiteUrl',
    }),
    //    defineField({
    //       name: 'tags',
    //       title: 'Tags',
    //       type: 'array',
    //       of: [
    //         {
    //           type: 'reference',
    //           to: [{ type: 'partnerType' }],
    //         },
    //       ],
    //     }),
    defineField({
      type: 'string',
      title: 'Quote text and profile',
      name: 'quote',
    }),
    defineField({
      type: 'string',
      title: 'Copy Partner Profile Url',
      name: 'partnerProfile',
    }),
  ],
})
