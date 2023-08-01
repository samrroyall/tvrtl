import {selector} from 'recoil';
import {gameConfig, players} from '../atoms';

export const scaledGameConfig = selector({
  key: 'scaledGameConfig',
  get: ({get}) => {
    const {size, padding} = get(gameConfig);
    const adjSize = size - padding * 2;

    return {
      size: adjSize,
      offset: {
        x: padding,
        y: padding,
      },
      origin: {
        x: adjSize / 2,
        y: adjSize / 2,
      },
    };
  },
});

export const gameCalculations = selector({
  key: 'gameCalculations',
  get: ({get}) => {
    const {num} = get(players);
    const {size} = get(scaledGameConfig);
    const radius = size / 2;

    return {
      points: [...Array(num).keys()].map(i => ({
        x: radius * Math.cos((2 * Math.PI * i) / num) + radius,
        y: radius * Math.sin((2 * Math.PI * i) / num) + radius,
      })),
    };
  },
});
