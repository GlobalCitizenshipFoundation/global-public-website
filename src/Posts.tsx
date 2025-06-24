import React, { useEffect, useState } from 'react';
import { sanityClient } from './client';
import { PortableText } from '@portabletext/react';

interface Post {
  _id: string;
  title: string;
  body?: any;
  mainImage?: any;
}

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "post"]{ _id, title, body, mainImage { asset -> { _id, url }, alt} }`)
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
          <PortableText value={post.body} />
        </article>
      ))}
    </div>
  );
};

export default PostsList;
