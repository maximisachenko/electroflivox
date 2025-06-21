import { cn } from '@/shared/lib/utils';

interface Props {
  src: string;
  className?: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({ src, className }) => {
  return (
    <img
      className={cn(
        'w-12 h-12 sm:w-14 sm:h-14 lg:w-[50px] lg:h-[60px] object-cover rounded-lg flex-shrink-0',
        className
      )}
      src={src}
      alt="Товар"
    />
  );
};
