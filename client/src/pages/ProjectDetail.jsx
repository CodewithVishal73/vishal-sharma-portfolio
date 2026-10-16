import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ProjectDetail() {
  const { slug } = useParams();

  return (
    <main>
      <h1>Project: {slug}</h1>
      <Link to="/">Back to Home</Link>
    </main>
  );
}
