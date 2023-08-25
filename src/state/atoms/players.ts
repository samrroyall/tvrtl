import {atom} from 'recoil';

interface PlayersAtom {
  maxPlayers: number;
  minPlayers: number;
  numPlayers: number;
  playerIdx: number;
}

export const playersAtom = atom<PlayersAtom>({
  key: 'playersAtom',
  default: {
    maxPlayers: 12,
    minPlayers: 3,
    numPlayers: 3,
    playerIdx: 0,
  },
});
