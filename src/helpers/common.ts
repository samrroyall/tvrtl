import {Vector2} from 'three';
import {GameResult, Player, Point} from '../models';
import storage from '../state/storage';

export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const pointFromVector2 = (v: Vector2): Point => [v.x, v.y];

export const loadStoredPlayer = async (): Promise<Player | null> => {
  let player: Player | null = null;
  await storage
    .load({key: 'player'})
    .then((p: Player) => (player = p))
    .catch(handleLoadStorageError);
  return player;
};

export const loadStoredGameHistory = async (): Promise<GameResult[]> => {
  let gameHistory: GameResult[] = [];
  await storage
    .load({key: 'gameHistory'})
    .then((gh: GameResult[]) => (gameHistory = gh))
    .catch(err => handleLoadStorageError(err, 'gameHistory', []));
  return gameHistory;
};

export const handleLoadStorageError = (
  err: any,
  key?: string,
  initialValue?: any,
) => {
  if (err.name !== 'NotFoundError') {
    console.log(err);
    return;
  }
  // Optionally, initialize the storage with a key/value pair if not found
  if (key && initialValue) {
    storage.save({key, data: initialValue});
  }
};

export const handleSaveStorageError = (err: any) => console.log(err);
