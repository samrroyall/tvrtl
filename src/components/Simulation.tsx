import React from 'react';
import {Center, Spinner} from 'native-base';
import Svg from 'react-native-svg';
import {useRecoilValue} from 'recoil';
import {gameAtom} from '../state/atoms';
import {gameSelector} from '../state/selectors';
import Board from './Board';
import G from './G';
import Grid from './Grid';
import PlayerLabels from './PlayerLabels';
import Turtle from './Turtle';

const Simulation: React.FC<{}> = () => {
  const {isLoading, size: boardSize} = useRecoilValue(gameAtom);
  const {boardPoints, offset} = useRecoilValue(gameSelector);
  const size = boardPoints ? boardSize : 0;

  return isLoading ? (
    <Center h={size} w={size}>
      <Spinner size="lg" />
    </Center>
  ) : (
    <Svg height={size} width={size}>
      <G translateX={offset[0]} translateY={offset[1]}>
        <Board />
        <PlayerLabels />
        <Grid />
        <Turtle />
      </G>
    </Svg>
  );
};

export default Simulation;
