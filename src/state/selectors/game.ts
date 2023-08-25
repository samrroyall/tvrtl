import {selector} from 'recoil';
import {gameAtom, playersAtom} from '../atoms';
import {getPlayerLabelPoints, getPolygonPoints} from '../../helpers';
import {Point} from '../../models';

interface GameSelector {
  size: number;
  offset: Point;
  origin: Point;
  boardPoints: Point[];
  labelPoints: Point[];
}

export const gameSelector = selector<GameSelector>({
  key: 'gameSelector',
  get: ({get}) => {
    const {size, padding} = get(gameAtom);
    const {numPlayers: n, playerIdx: i} = get(playersAtom);

    const adjSize = size - padding * 2;
    const radius = adjSize / 2;
    const labelDistance = radius + padding / 2;

    return {
      size: adjSize,
      offset: [padding, padding],
      origin: [radius, radius],
      boardPoints: getPolygonPoints(radius, n, i),
      labelPoints: getPlayerLabelPoints(radius, labelDistance, n, i),
    };
  },
});
