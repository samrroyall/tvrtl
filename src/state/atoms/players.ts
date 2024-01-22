import {atom} from 'recoil';
import {Player} from '../../models';

interface PlayersAtom {
  maxPlayers: number;
  minPlayers: number;
  playerIdx?: number;
  players?: Player[];
}

export const playersAtom = atom<PlayersAtom>({
  key: 'playersAtom',
  default: {
    maxPlayers: 12,
    minPlayers: 3,
  },
});
