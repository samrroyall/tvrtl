import React, {PropsWithChildren} from 'react';
import {Text as _Text, TextProps} from 'react-native-svg';

const Text: React.FC<PropsWithChildren<TextProps>> = ({children, ...props}) => (
  <_Text {...props}>{children}</_Text>
);

export default Text;
