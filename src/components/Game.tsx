import React from 'react';
import {theme} from 'native-base';
import Svg, {Circle, Line, Polygon as _Polygon} from 'react-native-svg';

interface Config {
  showGrid?: boolean;
  showCircle?: boolean;
}

interface Point {
  x: number;
  y: number;
}

interface GridProps {
  padding: number;
  size: number;
  config: Config;
}

interface PolygonProps {
  padding: number;
  size: number;
  points: Point[];
}

interface GameProps {
  size: number;
  numPlayers: number;
  config?: Config;
}

const lineWeight = 1;

const Grid: React.FC<GridProps> = ({padding, size, config}) => {
  const left = padding;
  const right = left + size;
  const mid = left + size / 2;
  const step = 10;
  const curr = (i: number) => left + i * (size / step);

  const circle = (
    <Circle
      key="encompassing-circle"
      cx={mid}
      cy={mid}
      r={size / 2}
      stroke="grey"
      strokeWidth={lineWeight}
    />
  );

  const grid: JSX.Element[] = [];
  [...Array(step + 1).keys()].forEach(i => {
    grid.push(
      <Line
        key={`hgl-${i}`}
        x1={left}
        y1={curr(i)}
        x2={right}
        y2={curr(i)}
        stroke={i === step / 2 ? 'blue' : 'grey'}
        strokeWidth={lineWeight}
      />,
    );
    grid.push(
      <Line
        key={`vgl-${i}`}
        x1={curr(i)}
        y1={left}
        x2={curr(i)}
        y2={right}
        stroke={i === step / 2 ? 'blue' : 'grey'}
        strokeWidth={lineWeight}
      />,
    );
  });

  return (
    <>
      {config.showGrid ? grid : <></>}
      {config.showCircle ? circle : <></>}
    </>
  );
};

const Polygon: React.FC<PolygonProps> = ({padding, size, points}) => {
  const mid = padding + size / 2;

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
      x1={mid}
      y1={mid}
      x2={x}
      y2={y}
      stroke={theme.colors.lime[200]}
      strokeWidth={lineWeight}
    />
  ));

  return (
    <>
      <_Polygon
        points={points.map(({x, y}) => `${x},${y}`).join(' ')}
        stroke={theme.colors.emerald[400]}
        fill={theme.colors.emerald[800]}
        strokeWidth={lineWeight}
      />
      {polygonLines}
      {polygonVertices}
    </>
  );
};

const Game: React.FC<GameProps> = ({size, numPlayers, config}) => {
  config = config || {showGrid: false, showCircle: false};

  const padding = 3;
  const adjSize = size - 2 * padding;
  const mid = adjSize / 2 + padding;
  const r = adjSize / 2;
  const polygonPoints = [...Array(numPlayers).keys()].map(i => ({
    x: r * Math.cos((2 * Math.PI * i) / numPlayers - Math.PI / 2) + mid,
    y: r * Math.sin((2 * Math.PI * i) / numPlayers - Math.PI / 2) + mid,
  }));

  return (
    <Svg height={size + 2 * lineWeight} width={size + 2 * lineWeight}>
      <Polygon padding={padding} size={adjSize} points={polygonPoints} />
      <Grid padding={padding} size={adjSize} config={config} />
    </Svg>
  );
};

export default Game;
