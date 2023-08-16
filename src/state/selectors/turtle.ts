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

    if (!points) {
      return {};
    }

    const {numPlayers, playerIdx} = get(playersAtom);
    const {size} = get(gameSelector);
    const radius = size / 2;

    const scaledAndOffsetPoints: Point[] = points.map(([x, y]) => [
      radius * x + radius,
      radius * y + radius,
    ]);

    const rotatedPoints = scaledAndOffsetPoints.map(p => {
      return rotateBoardPoint(p, playerIdx, numPlayers, [radius, radius]);
    });

    return {
      points: rotatedPoints,
    };
  },
});
