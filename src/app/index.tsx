import React from 'react';
import useDarkMode from 'use-dark-mode';
import { useApp } from 'stores/App';

export const App: React.FC = () => {
  useDarkMode();
  const cats = useApp();
  return <div>{JSON.stringify(cats)}</div>;
};
