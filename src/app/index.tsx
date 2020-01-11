import React from 'react';
import useDarkMode from 'use-dark-mode';
import { AnimatePresence } from 'framer-motion';
import { APP_STATE, useApp } from 'stores/App';
import { LoadingPage } from './LoadingPage';
import { Root } from './Root';

const TRANSITION = 2500;

export const App: React.FC = () => {
  useDarkMode();
  const { appState } = useApp();

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      {(appState === APP_STATE.LOADING || appState === APP_STATE.INITIALISING) && (
        <LoadingPage
          key={APP_STATE.LOADING}
          timeout={TRANSITION}
          label={appState === APP_STATE.INITIALISING ? 'Création des profils...' : undefined}
        />
      )}
      {appState === APP_STATE.READY && <Root key={APP_STATE.READY} />}
    </AnimatePresence>
  );
};
