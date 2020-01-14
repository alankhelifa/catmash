import React, { useCallback, useEffect, useState } from 'react';
import { Cat, Cats } from 'types/cat';
import db from 'database';
import catsData from 'assets/cats.json';
import { Elo } from 'types/Elo';
import { Mash } from 'types/Mash';
import { updateElo } from './elo-utils';

const START_ELO = 1000;
const LOADING_SCREEN_DURATION = 2500;

const init = async (): Promise<Cats> => {
  const currentElo: Elo = { value: START_ELO, date: new Date() };
  const eloEvolution = [currentElo];

  await db.cats.bulkAdd(
    // Auto-incremented id
    // eslint-disable-next-line
    // @ts-ignore
    catsData.map(image => ({
      image,
      currentElo,
      eloEvolution,
    })),
  );

  return new Promise<Cats>(resolve => {
    setTimeout(() => {
      resolve(db.cats.toArray());
    }, 1200);
  });
};

const random = (i: number): number => {
  return Math.floor(Math.random() * i);
};

export const APP_STATE = {
  LOADING: 'loading',
  INITIALISING: 'init',
  READY: 'ready',
};

type AppContextType = {
  appState: string;
  getCats: () => Promise<Cats>;
  getCat: (id: number) => Promise<Cat | undefined>;
  mash?: Mash;
  nextMash: Function;
  updateScore: (winnerId: number) => Promise<void>;
};

export const AppContext = React.createContext<AppContextType>({
  appState: APP_STATE.LOADING,
  mash: {} as Mash,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  nextMash: () => {},
  updateScore: () => Promise.resolve(),
  getCats: () => Promise.resolve([] as Cats),
  getCat: () => Promise.resolve({} as Cat),
});

export const AppProvider: React.FC = ({ children }) => {
  const [appState, setAppState] = useState(APP_STATE.LOADING);
  const [mash, setMash] = useState<Mash>();

  const updateScore = useCallback(
    async (winnerId: number) => {
      if (mash !== undefined) {
        const winner = mash.left.id === winnerId ? mash.left : mash.right;
        const loser = mash.left.id !== winnerId ? mash.left : mash.right;

        if (winner.currentElo && loser.currentElo) {
          const newElos = updateElo(winner.currentElo, loser.currentElo);
          await db.cats.update(winner.id, {
            currentElo: newElos.winner,
            eloEvolution: winner.eloEvolution.concat(newElos.winner),
          });
          await db.cats.update(loser.id, {
            currentElo: newElos.loser,
            eloEvolution: loser.eloEvolution.concat(newElos.loser),
          });
        }
      }
    },
    [mash],
  );

  const getCats = useCallback((): Promise<Cats> => {
    return db.cats.reverse().sortBy('currentElo.value');
  }, []);

  const getCat = useCallback(
    (id): Promise<Cat | undefined> => {
      return getCats().then(cats => {
        const catIndex = cats.findIndex(cat => cat.id === id);
        if (catIndex === -1) {
          return undefined;
        }
        cats[catIndex].rank = catIndex + 1;
        return cats[catIndex];
      });
    },
    [getCats],
  );

  const nextMash = useCallback(() => {
    getCats().then(cats => {
      const leftPosition = random(cats.length);
      const left = cats[leftPosition];
      const right =
        cats[
          leftPosition === cats.length - 1
            ? leftPosition - random(8) - 1
            : Math.min(leftPosition + random(8) + 1, cats.length - 1)
        ];
      setMash({ left, right });
    });
  }, [getCats]);

  useEffect(() => {
    if (appState === APP_STATE.LOADING) {
      new Promise<number>(resolve => {
        setTimeout(() => {
          resolve(db.cats.count());
        }, LOADING_SCREEN_DURATION);
      }).then(count => {
        if (count === 0) {
          setAppState(APP_STATE.INITIALISING);
        } else {
          nextMash();
          setAppState(APP_STATE.READY);
        }
      });
    } else if (appState === APP_STATE.INITIALISING) {
      init().then(() => {
        nextMash();
        setAppState(APP_STATE.READY);
      });
    }
  }, [appState, nextMash]);

  return (
    <AppContext.Provider value={{ appState, mash, nextMash, getCat, getCats, updateScore }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => React.useContext(AppContext);
