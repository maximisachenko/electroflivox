'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/shared/lib/utils';

interface Props {
  imageUrl: string;
  color: string;
  className?: string;
  productName: string;
}

export const ProductWithColorImage: React.FC<Props> = ({
  imageUrl,
  color,
  className,
  productName,
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [imageUrl]);

  return (
    <div
      className={cn(
        className,
        'flex items-center justify-center flex-1 relative w-full'
      )}
    >
      <Image
        key={imageUrl}
        src={imageUrl}
        alt="Изображение товара"
        width={360}
        height={360}
        className={cn(
          'relative left-2 top-2 transition-opacity transform duration-500 ease-in-out',
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        )}
        onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  );
};
