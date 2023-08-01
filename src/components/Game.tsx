import React, {PropsWithChildren} from 'react';
import {theme} from 'native-base';
import Svg, {
  Circle,
  G as _G,
  Line,
  Polygon as _Polygon,
  GProps,
} from 'react-native-svg';
import {useRecoilValue} from 'recoil';
import {gameConfig} from '../state/atoms';
import {gameCalculations, scaledGameConfig} from '../state/selectors';

interface Point {
  x: number;
  y: number;
}
interface GridProps {
  size: number;
  showGrid: boolean;
  showCircle: boolean;
}

interface PolygonProps {
  origin: Point;
  points: Point[];
}

const G: React.FC<PropsWithChildren<GProps>> = ({children, ...props}) => (
  <_G {...props}>{children}</_G>
);

const lineWeight = 1;

const Grid: React.FC<GridProps> = ({size, showCircle, showGrid}) => {
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
      {showGrid ? grid : <></>}
      {showCircle ? circle : <></>}
    </G>
  );
};

const Polygon: React.FC<PolygonProps> = ({origin, points}) => {
  const polygonVertices = points.map(({x, y}) => (
    <Circle
      key={`pv-${x}-${y}`}
      cx={x}
      cy={y}
      r={2}
      stroke={theme.colors.lime[200]}
      fill={theme.colors.coolGray[600]}
      strokeWidth={lineWeight}
    />
  ));

  const polygonLines = points.map(({x, y}) => (
    <Line
      key={`pl-${x}-${y}`}
      x1={origin.x}
      y1={origin.y}
      x2={x}
      y2={y}
      stroke={theme.colors.lime[200]}
      strokeWidth={lineWeight}
    />
  ));

  return (
    <G transform={`rotate(-90 ${origin.x} ${origin.y})`}>
      <_Polygon
        points={points.map(({x, y}) => `${x},${y}`).join(' ')}
        stroke={theme.colors.emerald[400]}
        fill={theme.colors.emerald[800]}
        strokeWidth={lineWeight}
      />
      {polygonLines}
      {polygonVertices}
    </G>
  );
};

const Game: React.FC<{}> = () => {
  const {size: wrapperSize, showCircle, showGrid} = useRecoilValue(gameConfig);
  const {size: contentSize, offset, origin} = useRecoilValue(scaledGameConfig);
  const {points} = useRecoilValue(gameCalculations);

  return (
    <Svg height={wrapperSize} width={wrapperSize}>
      <G transform={`translate(${offset.x} ${offset.y})`}>
        <Polygon origin={origin} points={points} />
        <Grid size={contentSize} showCircle={showCircle} showGrid={showGrid} />
      </G>
    </Svg>
  );
};

export default Game;
