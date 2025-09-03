'use client';

import { useEffect, useState } from 'react';

export default function CurrentBanner() {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch('/api/getUmaBanner?url=https://gametora.com/umamusume');
        const data = await res.json();
        if (data.content) {
          setContent(data.content);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching content:', error);
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : content ? (
        <div className='w-full flex flex-col items-center justify-center pointer-events-none' dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <p>Failed to load banner</p>
      )}
    </div>
  );
}