import {atom} from 'recoil';
import {Point} from '../../models';
import {theme} from 'native-base';

interface TurtleAtom {
  curveStroke: string;
  fill: string;
  lineStroke: string;
  showCurve: boolean;
  showLine: boolean;
  size: number;
  points?: Point[];
}

export const turtleAtom = atom<TurtleAtom>({
  key: 'turtleAtom',
  default: {
    curveStroke: theme.colors.lime[200],
    fill: theme.colors.white,
    lineStroke: theme.colors.coolGray[900],
    showCurve: false,
    showLine: false,
    size: 25,
  },
});
