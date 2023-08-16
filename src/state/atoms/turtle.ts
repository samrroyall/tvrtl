import {atom} from 'recoil';
import {Point} from '../../models';
import {theme} from 'native-base';

interface TurtleAtom {
  curveStroke: string;
  fill: string;
  lineStroke: string;
  size: number;
  points?: Point[];
}

export const turtleAtom = atom<TurtleAtom>({
  key: 'turtleAtom',
  default: {
    curveStroke: theme.colors.lime[200],
    fill: theme.colors.white,
    lineStroke: theme.colors.coolGray[900],
    size: 25,
  },
});
