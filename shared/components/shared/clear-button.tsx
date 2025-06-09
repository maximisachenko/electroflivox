import React from 'react';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

interface Props {
  onClick?: VoidFunction;
}

export const ClearButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 transition-all duration-200 hover:opacity-100 cursor-pointer hover:text-primary"
    >
      <X className="h-5 w-5" />
    </button>
  );
};
