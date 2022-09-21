import React from 'react';
import { Button } from '@chakra-ui/button';

type CustomButtonType = {
  variant?: 'primary' | 'secondary';
  children: any;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export default function CustomButton({ variant = 'primary', children }: CustomButtonType) {
  return <Button variant={variant}>{children}</Button>;
}
