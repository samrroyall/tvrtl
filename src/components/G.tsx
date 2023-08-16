import React from 'react';
import {G as _G, GProps} from 'react-native-svg';

const G: React.FC<React.PropsWithChildren<GProps>> = ({children, ...props}) => {
  return <_G {...props}>{children}</_G>;
};

export default G;
