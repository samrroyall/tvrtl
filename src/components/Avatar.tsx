import React from 'react';
import {Path} from 'react-native-svg';
import {useRecoilValue} from 'recoil';
import G from './G';
import {gameAtom} from '../state/atoms';
import {Point} from '../models';

interface AvatarProps {
  offset: Point;
  fill: string;
}

const Avatar: React.FC<AvatarProps> = ({offset, fill}) => {
  const {labelSize} = useRecoilValue(gameAtom);
  const originalSize = 16;

  return (
    <G
      translateX={offset[0] - labelSize}
      translateY={offset[1] - labelSize}
      scale={(2 * labelSize) / originalSize}
      fill={fill}>
      <Path d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0" />
    </G>
  );
};

export default Avatar;
