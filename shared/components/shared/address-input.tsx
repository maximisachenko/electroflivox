'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="9e7a065fb208d0a571fac3bba8b4ea9751a65c13"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
