import { cn } from '@/shared/lib/utils';

interface Props {
  name: string;
  details: string;
  className?: string;
}

export const CartItemInfo: React.FC<Props> = ({ name, details, className }) => {
  return (
    <div className="flex-1 min-w-0">
      <div className={cn('flex items-center justify-between', className)}>
        <h2 className="text-sm sm:text-base lg:text-lg font-bold flex-1 leading-tight truncate pr-2">
          {name}
        </h2>
      </div>
      {details && (
        <p className="text-xs sm:text-sm text-gray-400 mt-1 line-clamp-2 leading-tight">
          {details}
        </p>
      )}
    </div>
  );
};
