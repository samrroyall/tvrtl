export interface ApiCall {
  mockDelay: number;
  useMock: boolean;
}

export type Point = [number, number];

export interface Player {
  uuid: string;
  username: string;
  tokens: number;
}

export interface GameResult {
  uuid: string;
  wager: number;
  numPlayers: number;
  tokenDelta: number;
}
