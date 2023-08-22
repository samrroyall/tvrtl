import {selector} from 'recoil';
import {playersAtom, turtleAtom} from '../atoms';
import {gameSelector} from './game';
import {rotateBoardPoint} from '../../helpers';
import {Point} from '../../models';

interface TurtleSelector {
  points?: Point[];
}

export const turtleSelector = selector<TurtleSelector>({
  key: 'turtleSector',
  get: ({get}) => {
    const {points} = get(turtleAtom);

    const {numPlayers, playerIdx} = get(playersAtom);
    const {size} = get(gameSelector);
    const radius = size / 2;

    return {
      points: points
        ? points.map(([x, y]) =>
            rotateBoardPoint(
              [radius * x + radius, radius * y + radius],
              playerIdx,
              numPlayers,
              [radius, radius],
            ),
          )
        : undefined,
    };
  },
});
