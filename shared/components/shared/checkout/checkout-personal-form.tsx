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
        <div className="grid grid-cols-2 gap-5">
          <FormInput name="firstName" placeholder="Имя" className="text-base" />
          <FormInput
            name="lastName"
            placeholder="Фамилия"
            className="text-base"
          />
          <FormInput
            name="email"
            placeholder="Email"
            className="text-fontColor"
          />
          <FormInput name="phone" placeholder="Телефон" className="text-base" />
        </div>
      </WhiteBlock>
    </div>
  );
};
