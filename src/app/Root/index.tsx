import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { css } from 'emotion';
import { useLocation, Route, Switch } from 'react-router-dom';
import { Mash } from './Mash';
import { Ranking } from './Ranking';

const styles = css`
  height: 100%;
  width: 100%;
  overflow: hidden;

  section {
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
      overflow: hidden;
    }
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
    <motion.div className={styles} initial="exit" animate="enter" exit="exit" variants={variants}>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/" component={Mash} />
          <Route exact path="/ranking" component={Ranking} />
        </Switch>
      </AnimatePresence>
    </motion.div>
  );
};