export type Elo = {
  value: number;
  date: Date;
};

export type EloResult = {
  winner: Elo;
  loser: Elo;
};
