import React, { useEffect, useState } from 'react';
import { sanityClient } from './client';
import { PortableText } from '@portabletext/react';

interface Author {
  _id: string;
  name: string;
  bio: string;
}

interface Post {
  _id: string;
  title: string;
  description?: any;
  slug: string;
  authors?: Author[];
}

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "issueTest"]{ _id, title, description, slug, authors[]-> {_id, name, bio} }`
      )
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Sanity fetch error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div>
      {posts.length === 0 && <p>No posts found.</p>}
      {posts.map((post) => (
        <article key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          {post.authors?.map((author) => (
            <h2 key={author._id}>
              {author.name} <p>{author.bio}</p>
            </h2>
          ))}
        </article>
      ))}
    </div>
  );
};

export default PostsList;
