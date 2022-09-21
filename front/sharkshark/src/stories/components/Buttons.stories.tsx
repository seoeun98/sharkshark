import React from 'react';
import CustomButton from '../../components/Button';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Components/Button',
  component: CustomButton,
};

export const primary = () => {
  return <CustomButton>Primary</CustomButton>;
};

export const secondary = () => {
  return <CustomButton variant="secondary">Secondary</CustomButton>;
};
