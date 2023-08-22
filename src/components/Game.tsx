import React from 'react';
import {Center} from 'native-base';
import Svg from 'react-native-svg';
import {useRecoilValue} from 'recoil';
import {gameAtom} from '../state/atoms';
import {gameSelector} from '../state/selectors';
import Board from './Board';
import G from './G';
import Grid from './Grid';
import PlayerLabels from './PlayerLabels';
import Turtle from './Turtle';

const Game: React.FC<{}> = () => {
  const {size} = useRecoilValue(gameAtom);
  const {offset} = useRecoilValue(gameSelector);

  return (
    <Center h={size} w="100%" marginTop={10}>
      <Svg height={size} width={size}>
        <G translateX={offset[0]} translateY={offset[1]}>
          <Board />
          <PlayerLabels />
          <Grid />
          <Turtle />
        </G>
      </Svg>
    </Center>
  );
};

export default Game;
