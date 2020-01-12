import { Elo } from './Elo';

export type Cat = {
  id?: number;
  image: string;
  currentElo?: Elo;
  eloEvolution?: Array<Elo>;
};

export type Cats = Array<Cat>;
