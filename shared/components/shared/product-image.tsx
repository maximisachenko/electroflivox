import Image from 'next/image';
import { cn } from '@/shared/lib/utils';

interface Props {
  imageUrl: string;
  className?: string;
}

export const ProductImage: React.FC<Props> = ({ imageUrl, className }) => {
  return (
    <div
      className={cn(
        className,
        'flex items-center justify-center flex-1 relative w-full'
      )}
    >
      <img
        src={imageUrl}
        alt="Logo"
        className={cn('relative left-2 top-2 transition-all z-10 duration-300')}
      />
    </div>
  );
};
