import {atom} from 'recoil';

export const gameConfig = atom({
  key: 'gameConfig',
  default: {
    padding: 3,
    showCircle: false,
    showGrid: false,
    size: 250,
  },
});
