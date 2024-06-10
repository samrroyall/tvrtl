import React from 'react';
import {gameAtom, playersAtom} from '../state/atoms';
import {useRecoilValue} from 'recoil';
import {gameSelector} from '../state/selectors';
import Avatar from './Avatar';
import G from './G';
import Text from './Text';

interface PlayerLabelProps {
  fontSize?: number;
  fontWeight?: number;
  showBorder?: boolean;
}

const PlayerLabels: React.FC<PlayerLabelProps> = () => {
  const config = useRecoilValue(gameAtom);
  const {playerIdx} = useRecoilValue(playersAtom);
  const {labelPoints} = useRecoilValue(gameSelector);

  const labels = labelPoints
    ? labelPoints.map(([x, y], i) => (
        <G key={`plg-${i}`}>
          <Avatar
            key={`pli-${i}`}
            offset={[x, y]}
            fill={
              i === playerIdx
                ? config.labelOutlineFillActive
                : config.labelOutlineFill
            }
          />
          <Text
            key={`pln-${i}`}
            x={x}
            y={y + (2 * config.labelSize) / 3}
            textAnchor="middle"
            fontSize={config.labelFontSize}
            fontWeight={config.labelFontWeight}
            stroke={config.showLabelText ? config.labelFontColor : ''}>
            {i + 1}
          </Text>
        </G>
      ))
    : null;

  return <G>{labels}</G>;
};

export default PlayerLabels;
