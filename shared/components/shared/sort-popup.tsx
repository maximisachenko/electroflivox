import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Button } from '../ui';
import { ArrowDownUp } from 'lucide-react';

interface Props {
  className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-5 h-[55px] rounded-2xl cursor-pointer bg-categoriesBackground',
        className
      )}
    >
      <ArrowDownUp size={15} className="text-fontColor" />
      <b className="text-fontColor text-base">Сортировка: </b>
      <b className="text-baseColor text-base">по рейтингу</b>
    </div>
  );
};
