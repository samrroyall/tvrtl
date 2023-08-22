import {atom} from 'recoil';
import {SplineCurve} from 'three';

interface MotionAtom {
  line?: string;
  curve?: string;
  spline?: SplineCurve;
}

export const motionAtom = atom<MotionAtom>({
  key: 'motionAtom',
  default: {},
});
