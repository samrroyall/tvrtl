import * as d3 from 'd3';
import {Vector2, SplineCurve} from 'three';
import {Point} from '../models';

export const getNormalizedPoints = (points: Point[]): Point[] => {
  const max_norm = points.reduce(
    (acc, [x, y]) => Math.max(acc, Math.sqrt(x ** 2 + y ** 2)),
    0,
  );

  return points.map(([x, y]) => [x / max_norm, y / max_norm]);
};

const rotatePoint = (p: Point, rot: number, origin: Point): Point => {
  const _p = [p[0] - origin[0], p[1] - origin[1]]; // translate to origin
  // rotate and translate back
  const result = [
    _p[0] * Math.cos(rot) - _p[1] * Math.sin(rot) + origin[0],
    _p[0] * Math.sin(rot) + _p[1] * Math.cos(rot) + origin[1],
  ];
  return result as Point;
};

export const rotateBoardPoint = (
  p: Point,
  i: number, // current player index
  n: number, // number of players
  origin: Point,
): Point => {
  // rotate the point to the bottom of the screen minus half a sector
  const sectorAngle = (2 * Math.PI) / n;
  const currentAngle = i * sectorAngle;
  const bottomTheta = Math.PI / 2;
  const rot = bottomTheta - currentAngle - sectorAngle / 2;
  return rotatePoint(p, rot, origin);
};

const getPolygonPoint = (
  s: number, // scale
  r: number, // radius
  i: number, // point index in polygon
  n: number, // number of sides
  rot?: number,
): Point => {
  // get the ith point of the polygon scaled and translated
  const sectorAngle = (2 * Math.PI) / n;
  const currentAngle = i * sectorAngle;
  return [
    s * Math.cos(currentAngle + (rot || 0)) + r,
    s * Math.sin(currentAngle + (rot || 0)) + r,
  ];
};

export const getPolygonPoints = (
  r: number, // polygon radius
  n: number, // number of players
  i: number, // current player index
): Point[] => {
  // get all polygon points and rotate them based on the current player
  return [...Array(n).keys()].map(_i => {
    return rotateBoardPoint(getPolygonPoint(r, r, _i, n), i, n, [r, r]);
  });
};

export const getPlayerLabelPoints = (
  r: number, // polygon radius
  d: number, // distance from origin to label
  n: number, // number of players
  i: number, // current player index
) => {
  return [...Array(n).keys()].map(_i => {
    // get all label points: this is equivalent to getting all polygon points
    // at a distance of d from the origin and rotated an extra half sector
    const sectorTheta = (2 * Math.PI) / n;
    const rot = sectorTheta / 2;
    return rotateBoardPoint(getPolygonPoint(d, r, _i, n, rot), i, n, [r, r]);
  });
};

export const polygonContains = (points: Point[], p: Point): boolean =>
  d3.polygonContains(points, p);

export const getPointSectorIdx = (
  p: Point, // individual point
  points: Point[], // polygon points
  origin: Point, // origin
): number => {
  if (polygonContains(points, p)) {
    for (let i = 0; i < points.length; i++) {
      const sector = [
        origin,
        points[i],
        points[i === points.length - 1 ? 0 : i + 1],
      ];
      if (polygonContains(sector, p)) {
        return i;
      }
    }
  }

  return -1;
};
export const getLine = (points: Point[]): string => d3.line()(points) || '';

export const getCatmullRom = (points: Point[], alpha?: number): string =>
  d3.line().curve(d3.curveCatmullRom.alpha(alpha || 0.5))(points) || '';

export const getSpline = (points: Point[]): SplineCurve =>
  new SplineCurve(points.map(([x, y]) => new Vector2(x, y)));

export const getTangentAngle = (tp: Point): number => Math.atan2(tp[1], tp[0]);
