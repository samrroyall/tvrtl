import React from 'react';
import {useRecoilValue} from 'recoil';
import {Circle, Line} from 'react-native-svg';
import {gameAtom} from '../state/atoms';
import {gameSelector} from '../state/selectors';
import G from './G';

const Grid: React.FC<{}> = () => {
  const {lineWeight, showCircle, showGrid} = useRecoilValue(gameAtom);
  const {size} = useRecoilValue(gameSelector);

  const step = 10;
  const r = size / 2;
  const curr = (i: number) => i * (size / step);

  const circle = (
    <Circle
      key="encompassing-circle"
      cx={r}
      cy={r}
      r={r}
      stroke="grey"
      strokeWidth={lineWeight}
    />
  );

  const grid: React.JSX.Element[] = [];
  [...Array(step + 1).keys()].forEach(i => {
    grid.push(
      <Line
        key={`hgl-${i}`}
        x1={0}
        y1={curr(i)}
        x2={size}
        y2={curr(i)}
        stroke={i === step / 2 ? 'blue' : 'grey'}
        strokeWidth={lineWeight}
      />,
    );
    grid.push(
      <Line
        key={`vgl-${i}`}
        x1={curr(i)}
        y1={0}
        x2={curr(i)}
        y2={size}
        stroke={i === step / 2 ? 'blue' : 'grey'}
        strokeWidth={lineWeight}
      />,
    );
  });

  return (
    <G>
      {showGrid ? grid : null}
      {showCircle ? circle : null}
    </G>
  );
};

export default Grid;
