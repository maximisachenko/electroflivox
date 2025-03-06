import React from 'react';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Props {
  onClick?: VoidFunction;
}

export const ClearButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer"
    >
      <X className="h-5 w-5" />
    </Button>
  );
};
