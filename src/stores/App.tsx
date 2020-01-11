import React, { useEffect, useState } from 'react';
import { Cats } from 'types/cat';
import db from 'database';
import catsData from 'assets/cats.json';
import { Elo } from 'types/Elo';

const START_ELO = 1000;
const LOADING_SCREEN_DURATION = 2500;

const init = async (): Promise<Cats> => {
  const currentElo: Elo = { value: START_ELO, date: new Date() };

  await db.cats.bulkAdd(
    catsData.map(image => ({
      image,
      currentElo,
      eloEvolution: [],
    })),
  );

  return new Promise<Cats>(resolve => {
    setTimeout(() => {
      resolve(db.cats.toArray());
    }, 1200);
  });
};

export const APP_STATE = {
  LOADING: 'loading',
  INITIALISING: 'init',
  READY: 'ready',
};

type AppContextType = {
  appState: string;
  cats: Cats;
};

export const AppContext = React.createContext<AppContextType>({
  appState: APP_STATE.LOADING,
  cats: [],
});

export const AppProvider: React.FC = ({ children }) => {
  const [appState, setAppState] = useState(APP_STATE.LOADING);
  const [cats, setCats] = useState<Cats>([]);

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
      setCats(cats);
      setAppState(APP_STATE.READY);
    }
  }, [cats]);

  useEffect(() => {
    if (appState === APP_STATE.INITIALISING) {
      init().then(cats => {
        setCats(cats);
        setAppState(APP_STATE.READY);
      });
    }
  }, [appState]);

  return <AppContext.Provider value={{ appState, cats }}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => React.useContext(AppContext);
