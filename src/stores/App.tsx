import React, { useCallback, useEffect, useState } from 'react';
import { Cats } from 'types/cat';
import db from 'database';
import catsData from 'assets/cats.json';
import { Elo } from 'types/Elo';
import { Mash } from 'types/Mash';

const START_ELO = 1000;
const LOADING_SCREEN_DURATION = 2500;

const init = async (): Promise<Cats> => {
  const currentElo: Elo = { value: START_ELO, date: new Date() };
  const eloEvolution = [currentElo];

  await db.cats.bulkAdd(
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
  mash?: Mash;
  nextMash: Function;
  getCats: () => Promise<Cats>;
};

export const AppContext = React.createContext<AppContextType>({
  appState: APP_STATE.LOADING,
  mash: {} as Mash,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  nextMash: () => {},
  getCats: () => Promise.resolve([] as Cats),
});

export const AppProvider: React.FC = ({ children }) => {
  const [appState, setAppState] = useState(APP_STATE.LOADING);
  const [mash, setMash] = useState<Mash>();

  const getCats = useCallback((): Promise<Cats> => {
    return db.cats.reverse().sortBy('currentElo.value');
  }, []);

  const nextMash = useCallback(() => {
    getCats().then(cats => setMash({ left: cats[random(cats.length)], right: cats[random(cats.length)] }));
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

  return <AppContext.Provider value={{ appState, mash, nextMash, getCats }}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => React.useContext(AppContext);
