import React from 'react';
import {Circle, Line, Polygon as _Polygon} from 'react-native-svg';
import {useRecoilValue} from 'recoil';
import {gameAtom} from '../state/atoms';
import {gameSelector} from '../state/selectors';
import G from './G';

interface BoardProps {
  showLines?: boolean;
  showVertices?: boolean;
}

const Board: React.FC<BoardProps> = ({showLines, showVertices}) => {
  const config = useRecoilValue(gameAtom);
  const {boardPoints, origin} = useRecoilValue(gameSelector);

  const polygonVertices = boardPoints.map(([x, y]) => (
    <Circle
      key={`pv-${x}-${y}`}
      cx={x}
      cy={y}
      r={2}
      stroke={config.polygonVertexStroke}
      fill={config.polygonVertexFill}
      strokeWidth={config.lineWeight}
    />
  ));

  const polygonLines = boardPoints.map(([x, y]) => (
    <Line
      key={`pl-${x}-${y}`}
      x1={origin[0]}
      y1={origin[1]}
      x2={x}
      y2={y}
      stroke={config.polygonLineStroke}
      strokeWidth={config.lineWeight}
    />
  ));

  return (
    <G>
      <_Polygon
        points={boardPoints.map(([x, y]) => `${x},${y}`).join(' ')}
        stroke={config.polygonStroke}
        fill={config.polygonFill}
        strokeWidth={config.lineWeight}
      />
      {showLines || true ? polygonLines : null}
      {showVertices || true ? polygonVertices : null}
    </G>
  );
};

export default Board;
