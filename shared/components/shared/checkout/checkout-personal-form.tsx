import React from 'react';
import { WhiteBlock } from '../white-block';
import { Input } from '../../ui/input';
import { FormInput } from '../form/form-input';

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <div>
      <WhiteBlock title="2. Персональные данные" className="text-fontColor">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <FormInput name="firstName" placeholder="Имя" className="text-base" />
          <FormInput
            name="lastName"
            placeholder="Фамилия"
            className="text-base"
          />
          <div className="col-span-1 sm:col-span-2">
            <FormInput
              name="email"
              placeholder="Эл. почта"
              className="text-fontColor"
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <FormInput name="phone" placeholder="Телефон" className="text-base" />
          </div>
        </div>
      </WhiteBlock>
    </div>
  );
};
