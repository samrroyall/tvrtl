import {selector} from 'recoil';
import {SplineCurve} from 'three';
import {gameAtom, playersAtom, turtleAtom} from '../atoms';
import {
  getCatmullRom,
  getLine,
  getPointSectorIdx,
  getSpline,
  pointFromVector2,
  polygonContains,
  rotateBoardPoint,
} from '../../helpers';
import {gameSelector} from './game';
import {Point} from '../../models';

interface MotionSelector {
  line?: string;
  curve?: string;
  spline?: SplineCurve;
  splinePoints?: Point[];
  tangentPoints?: Point[];
  losingSectorIdx?: number;
}

export const motionSelector = selector<MotionSelector>({
  key: 'motionSelector',
  get: ({get}) => {
    const {simulationSteps} = get(gameAtom);
    const {points} = get(turtleAtom);
    const {players, playerIdx} = get(playersAtom);
    const {boardPoints, origin, size} = get(gameSelector);
    const radius = size / 2;

    if (!points || !playerIdx || !players || !boardPoints) {
      return {};
    }

    const rotatedAndScaledPoints = points.map(([x, y]) =>
      rotateBoardPoint(
        [(radius + 1) * x + radius, (radius + 1) * y + radius],
        playerIdx,
        players.length,
        [radius, radius],
      ),
    );

    const line = getLine(rotatedAndScaledPoints);
    const curve = getCatmullRom(rotatedAndScaledPoints);
    const spline = getSpline(rotatedAndScaledPoints);
    const splineVector2s = spline.getPoints(simulationSteps);

    let splinePoints: Point[] = [];
    let tangentPoints: Point[] = [];
    for (let i = 0; i < splineVector2s.length; i++) {
      const splinePoint = pointFromVector2(splineVector2s[i]);
      splinePoints.push(splinePoint);
      tangentPoints.push(
        pointFromVector2(spline.getTangent(i / simulationSteps))!,
      );
      if (!polygonContains(boardPoints, splinePoint)) {
        break;
      }
    }

    const losingSectorIdx = getPointSectorIdx(
      splinePoints[splinePoints.length - 2],
      boardPoints,
      origin,
    );

    return {
      line,
      curve,
      spline,
      splinePoints,
      tangentPoints,
      losingSectorIdx,
    };
  },
});
