import {delay} from '../helpers';
import {ApiCall, Player} from '../models';

interface GetPlayersArgs extends ApiCall {
  maxPlayers: number;
  minPlayers: number;
  currPlayer: Player;
}

const getMockPlayers = async (args: GetPlayersArgs): Promise<Player[]> => {
  const {currPlayer, maxPlayers, minPlayers, mockDelay} = args;
  await delay(mockDelay);
  const numPlayers = Math.floor(
    Math.random() * (maxPlayers - minPlayers + 1) + 3,
  );
  const currPlayerIdx = Math.floor(Math.random() * numPlayers);
  return [...Array(numPlayers).keys()].map(i =>
    i === currPlayerIdx
      ? currPlayer
      : {
          id: `${i}`,
          username: `player_${i}`,
        },
  );
};

const getPlayers = (args: GetPlayersArgs): never => {
  throw new Error('Not implemented');
};

const playerApi = {
  getPlayers: (args: GetPlayersArgs): Promise<Player[]> => {
    return args.useMock ? getMockPlayers(args) : getPlayers(args);
  },
};

export default playerApi;
