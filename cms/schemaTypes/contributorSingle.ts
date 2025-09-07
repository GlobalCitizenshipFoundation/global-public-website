import {defineType, defineField} from 'sanity'
import countryOptions from '../../utils/countryOptions'

export const contributorSingle = defineType({
  type: 'document',
  name: 'contributorSingle',
  fields: [
    defineField({
      type: 'string',
      title: 'Title',
      name: 'title',
    }),
    defineField({
      type: 'string',
      title: 'Name',
      name: 'name',
    }),
    defineField({
      type: 'image',
      title: 'Person photo',
      name: 'photo',
      options: {hotspot: true},
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      options: {source: 'name'},
    }),
    defineField({
      type: 'string',
      name: 'gender',
      title: 'Gender',
      options: {
        list: [
          {title: 'Male', value: 'male'},
          {title: 'Female', value: 'female'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      type: 'string',
      title: 'Designation',
      name: 'designation',
    }),
    defineField({
      type: 'string',
      title: 'Division/Organization',
      name: 'organization',
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
      name: 'emailId',
      type: 'string',
      title: 'Email Address',
      validation: (Rule) => Rule.email().error('Please enter a valid email'),
    }),
    defineField({
      name: 'emailDisplay',
      type: 'boolean',
      title: 'Display email publicly?',
      initialValue: false,
    }),
    defineField({
      name: 'orcidId',
      title: 'ORCiD ID',
      type: 'url',
    }),
    defineField({
      type: 'string',
      title: 'Twitter',
      name: 'twitter',
    }),
    defineField({
      type: 'string',
      title: 'LinkedIn',
      name: 'linkedin',
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
      title: 'Website',
      name: 'website',
    }),
    defineField({
      type: 'boolean',
      title: 'Featured Profile',
      name: 'featuredProfile',
      initialValue: false,
    }),
    defineField({
      type: 'string',
      title: 'Short Bio',
      name: 'shortBio',
    }),
    defineField({
      type: 'array',
      name: 'bio',
      title: 'Bio',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'relatedProfiles',
      title: 'Related Profiles',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'contributorSingle'}],
        },
      ],
    }),
    defineField({
      type: 'boolean',
      title: 'Article display',
      name: 'articleDisplay',
      initialValue: false,
    }),
    defineField({
      type: 'boolean',
      title: 'Events display',
      name: 'eventsDisplay',
      initialValue: false,
    }),
    // defineField({
    //   name: 'article',
    //   title: 'Article',
    //   type: 'reference',
    //   to: [{ type: 'articleSingle' }],
    // }),
    defineField({
      name: 'events',
      title: 'Events',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'eventSingle'}],
        },
      ],
    }),
    // defineField({
    //   name: 'specialization',
    //   title: 'Specialization',
    //   type: 'reference',
    //   to: [{ type: 'topicSingle' }],
    // }),
    defineField({
      type: 'string',
      title: 'Header',
      name: 'header',
    }),
    defineField({
      type: 'string',
      title: 'Profile Colour',
      name: 'profileColour',
    }),
    defineField({
      type: 'string',
      title: 'Text colour',
      name: 'textColour',
    }),
  ],
})
