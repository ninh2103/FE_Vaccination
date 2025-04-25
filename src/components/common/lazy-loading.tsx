import { useEffect, useState } from 'react';

export default function LazyLoading() {
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);

    const handlePageLoad = () => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      window.addEventListener('load', handlePageLoad);
    }

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 90) return prevProgress;
        return prevProgress + Math.random() * 8;
      });
    }, 100);

    return () => {
      clearInterval(interval);
      window.removeEventListener('load', handlePageLoad);
    };
  }, []);

  if (!isClient || !loading) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="relative w-12 h-12">
        {/* iPhone-style spinner */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="spinner">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="absolute w-1 h-3 bg-gray-400 rounded-full"
                style={{
                  transform: `rotate(${index * 30}deg) translateY(-10px)`,
                  animation: `fade 1s linear infinite`,
                  animationDelay: `${index * 0.083}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}