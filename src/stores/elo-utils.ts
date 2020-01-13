import { Elo, EloResult } from 'types/Elo';

const K = 30;

export const probability = (rating1: number, rating2: number): number => {
  return 1.0 / (1 + Math.pow(10, (rating1 - rating2) / 400));
};

export const updateElo = (winnerElo: Elo, loserElo: Elo): EloResult => {
  const pWinner = probability(winnerElo.value, loserElo.value);
  const pLoser = probability(loserElo.value, winnerElo.value);

  const newWinnerEloValue = winnerElo.value + K * (1 - pWinner);
  const newLoserEloValue = loserElo.value + K * (0 - pLoser);

  const date = new Date();
  return {
    winner: { value: newWinnerEloValue, date },
    loser: { value: newLoserEloValue, date },
  };
};
