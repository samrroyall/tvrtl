import React from 'react';
import {Center} from 'native-base';
import Svg from 'react-native-svg';
import {StyleSheet} from 'react-native';
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
    <Center style={styles.gameWrapper} h={size + 50} w="100%">
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

const styles = StyleSheet.create({
  gameWrapper: {
    // borderColor: 'white',
    // borderWidth: 1,
  },
});

export default Game;
