import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import Masonry from 'react-masonry-css';
import { BACKEND_URL } from '../config';
import axios from 'axios';

interface ContentItem {
  id: string;
  type: 'Youtube' | 'Twitter';
  link: string;
  title: string;
  tags?: string[];
}

const breakpointColumnsObj = {
  default: 4,
  1200: 3,
  900: 2,
  600: 1
};

export default function PublicBrain() {
  const { shareId } = useParams<{ shareId: string }>();
  const [username, setUsername] = useState<string>('');
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBrain() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareId}`);
        setUsername(res.data.username);
        setContent(res.data.content);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch brain');
      } finally {
        setLoading(false);
      }
    }
    fetchBrain();
  }, [shareId]);

  // Twitter script loader (already present)
  useEffect(() => {
    if (!(window as any).twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Ensure Twitter embeds render after content loads
  useEffect(() => {
    if ((window as any).twttr && (window as any).twttr.widgets) {
      (window as any).twttr.widgets.load();
    }
  }, [content]);

  return (
    <div className="relative min-h-screen bg-white font-['Inter']">
      <main className="relative z-10 px-2 pt-8 pb-16 w-full md:max-w-6xl md:mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
          {username ? `${username}'s Brain` : 'Brain'}
        </h1>
        {loading && <div className="text-gray-500 text-center">Loading...</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}
        {!loading && !error && (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex gap-8 w-full"
            columnClassName="masonry-column"
          >
            {content.length === 0 && (
              <div className="w-full flex flex-col items-center justify-center min-h-[40vh] text-center">
                <span className="text-gray-400 text-lg font-semibold">No thoughts yet...</span>
              </div>
            )}
            {content.map((item, idx) => (
              <div key={item.id + idx} className="mb-8">
                <Card
                  id={item.id}
                  type={item.type}
                  link={item.link}
                  title={item.title}
                  onDelete={() => {}}
                />
              </div>
            ))}
          </Masonry>
        )}
      </main>
    </div>
  );
} 