import {Vector2} from 'three';
import {Point} from '../models';

export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const pointFromVector2 = (v: Vector2): Point => [v.x, v.y];
