import { Elo } from './Elo';

export type Cat = {
  id: number;
  image: string;
  rank?: number;
  currentElo: Elo;
  eloEvolution: Array<Elo>;
};

export type Cats = Array<Cat>;
