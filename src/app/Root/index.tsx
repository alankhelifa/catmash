import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { css } from 'emotion';
import { useLocation, Route, Switch } from 'react-router-dom';
import { Mash } from './Mash';
import { Ranking } from './Ranking';
import catLogo from 'assets/cat-logo.png';

const styles = css`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  > header {
    height: 160px;
    padding: var(--spacing-unit-2);
    flex-shrink: 0;

    > img {
      display: block;
      height: 100%;
      margin: auto;
    }
  }

  > main {
    height: 100%;
  }
`;

const variants = {
  enter: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
  },
};

export const Root: React.FC = () => {
  const location = useLocation();

  return (
    <motion.section className={styles} initial="exit" animate="enter" exit="exit" variants={variants}>
      <header>
        <img src={catLogo} alt="Logo CatMash" />
      </header>
      <main>
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={Mash} />
            <Route exact path="/ranking" component={Ranking} />
          </Switch>
        </AnimatePresence>
      </main>
    </motion.section>
  );
};
