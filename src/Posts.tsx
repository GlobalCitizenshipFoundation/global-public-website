import React, { useEffect, useState } from 'react';
import { sanityClient } from './client';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

// interface Author {
//   _id: string;
//   name: string;
//   bio: string;
// }

// interface Post {
//   _id: string;
//   title: string;
//   description?: any;
//   slug: string;
//   authors?: Author[];
// }

interface ImageDimensions {
  _type: 'sanity.imageDimensions';
  aspectRatio: number;
  width: number;
  height: number;
}

interface SanityImageAsset {
  url: string;
  metadata: {
    dimensions: ImageDimensions;
    lqip: string;
  };
}

interface SanityImage {
  asset: SanityImageAsset;
}

interface EventSingle {
  _id: string;
  eventHeading?: string;
  slug?: {
    _type: 'slug';
    current: string;
  };
  eventImage?: SanityImage;
  pricing?: string;
  status?: string;
  attedanceMode?: string;
  startDateTime?: string;
  endDateTime?: string;
  marketingMention?: PortableTextBlock[];
  price?: number;
  registrationDeadline?: string;
  seatingCapacity?: number;
  currentRegistrations?: number;
  registrationStatus?: string;
  financialAid?: PortableTextBlock[];
  buttonPrimary?: string;
  introText?: PortableTextBlock[];
  body?: PortableTextBlock[];
  venue?: string;
  promoMessage?: PortableTextBlock[];
  buttonSecondary?: string;
  buttonTertiary?: string;
  audience?: string[];
  agendaHeading?: string;
  agendaDescription?: PortableTextBlock[];
  endText?: PortableTextBlock[];
  addToCalendarUrl?: string;
}

const PostsList: React.FC = () => {
  const [eventSingle, seteventSingle] = useState<EventSingle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "eventSingle"][0]{
         _id,
          eventHeading,
          slug,
          eventImage{
            asset->{
              url,
              metadata { dimensions, lqip }
            },
          },
          pricing,
          status,
          attedanceMode,
          startDateTime,
          endDateTime,
          marketingMention,
          price,
          registrationDeadline,
          seatingCapacity,
          currentRegistrations,
          registrationStatus,
          financialAid,
          buttonPrimary,
          introText,
          body,
          venue,
          promoMessage,
          buttonSecondary,
          buttonTertiary,
          audience,
          agendaHeading,
          agendaDescription,
          endText,
          addToCalendarUrl
        }`
      )
      .then((data) => {
        seteventSingle(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Sanity fetch error:', err);
        setLoading(false);
      });
  }, []);

  console.log(eventSingle?.agendaDescription);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div>
      {eventSingle === null && <p>No posts found.</p>}
      {/* {posts.map((post) => (
        <article key={post._id}>
          <h2>{post.}</h2>
          <p>{post.marketingMention.}</p>
          {post.authors?.map((author) => (
            <h2 key={author._id}>
              {author.name} <p>{author.bio}</p>
            </h2>
          ))}
        </article>
      ))} */}
      {eventSingle?.agendaDescription && <PortableText value={eventSingle.agendaDescription} />}
    </div>
  );
};

export default PostsList;
