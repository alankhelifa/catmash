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
  cats: Cats;
  mash?: Mash;
  nextMash: Function;
};

export const AppContext = React.createContext<AppContextType>({
  appState: APP_STATE.LOADING,
  cats: [],
  mash: {} as Mash,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  nextMash: () => {},
});

export const AppProvider: React.FC = ({ children }) => {
  const [appState, setAppState] = useState(APP_STATE.LOADING);
  const [cats, setCats] = useState<Cats>([]);
  const [mash, setMash] = useState<Mash>();

  const nextMash = useCallback(() => {
    setMash({ left: cats[random(cats.length)], right: cats[random(cats.length)] });
  }, [cats]);

  useEffect(() => {
    const loadCats = (): Promise<Cats> => {
      return new Promise<Cats>(resolve => {
        setTimeout(() => {
          resolve(db.cats.toArray());
        }, LOADING_SCREEN_DURATION);
      });
    };

    if (cats.length === 0) {
      loadCats().then(cats => {
        if (cats.length !== 0) {
          setCats(cats);
        } else {
          setAppState(APP_STATE.INITIALISING);
        }
      });
    } else {
      nextMash();
      setAppState(APP_STATE.READY);
    }
  }, [cats, nextMash]);

  useEffect(() => {
    if (appState === APP_STATE.INITIALISING) {
      init().then(cats => {
        setCats(cats);
        nextMash();
        setAppState(APP_STATE.READY);
      });
    }
  }, [appState, nextMash]);

  return <AppContext.Provider value={{ appState, cats, mash, nextMash }}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => React.useContext(AppContext);
