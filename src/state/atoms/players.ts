import {atom} from 'recoil';

export const players = atom({
  key: 'players',
  default: {
    max: 12,
    min: 3,
    num: 3,
  },
});
