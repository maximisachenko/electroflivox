'use client';

import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormTextarea } from '../form';
import { AdressInput } from '../address-input';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '../error-text';
import { useEffect, useState } from 'react';

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // or render a loading state

  return (
    <div>
      <WhiteBlock title="3. Адрес доставки" className="text-fontColor">
        <div className="flex flex-col gap-5">
          <Controller
            control={control}
            name="address"
            render={({ field, fieldState }) => (
              <>
                <AdressInput onChange={field.onChange} />
                {fieldState.error?.message && (
                  <ErrorText text={fieldState.error.message} />
                )}
              </>
            )}
          />

          <FormTextarea
            className="text-base"
            placeholder="Комментарии к заказу"
            rows={5}
            name="comment"
          />
        </div>
      </WhiteBlock>
    </div>
  );
};
