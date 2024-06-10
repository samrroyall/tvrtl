import React from 'react';
import {Circle, Polygon as _Polygon} from 'react-native-svg';
import {useRecoilValue} from 'recoil';
import {gameAtom} from '../state/atoms';
import {gameSelector, motionSelector} from '../state/selectors';
import G from './G';

const Board: React.FC<{}> = () => {
  const game = useRecoilValue(gameAtom);
  const {boardPoints, origin} = useRecoilValue(gameSelector);
  const {losingSectorIdx} = useRecoilValue(motionSelector);

  const polygonVertices = boardPoints
    ? boardPoints.map(([x, y]) => (
        <Circle
          key={`pv-${x}-${y}`}
          cx={x}
          cy={y}
          r={2}
          stroke={game.polygonVertexStroke}
          fill={game.polygonVertexFill}
          strokeWidth={game.lineWeight}
        />
      ))
    : null;

  const board = boardPoints
    ? boardPoints.map((p1, i) => {
        const p2 = boardPoints[i === boardPoints.length - 1 ? 0 : i + 1];
        const points = [p1, p2, origin];
        return (
          <_Polygon
            key={`sector-${i}`}
            points={points.map(p => `${p[0]},${p[1]}`).join(' ')}
            stroke={game.showBoardLines ? game.polygonStroke : game.polygonFill}
            fill={
              game.simulationFinished && losingSectorIdx === i
                ? game.polygonStroke
                : game.polygonFill
            }
            strokeWidth={game.lineWeight}
          />
        );
      })
    : null;

  return (
    <G>
      {board}
      {game.showBoardVertices ? polygonVertices : null}
    </G>
  );
};

export default Board;
