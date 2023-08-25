import React from 'react';
import {
  Checkbox as ExpoCheckbox,
  CheckboxProps as ExpoCheckboxProps,
} from 'expo-checkbox';
import {HStack, Text} from 'native-base';

interface CheckboxProps extends ExpoCheckboxProps {
  label: string;
  w?: string | number;
}

const Checkbox: React.FC<CheckboxProps> = ({label, w, ...props}) => {
  return (
    <HStack w={w || '100%'}>
      <ExpoCheckbox {...props} />
      <Text ml={3}>{label}</Text>
    </HStack>
  );
};

export default Checkbox;
