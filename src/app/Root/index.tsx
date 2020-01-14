import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { css } from 'emotion';
import { useLocation, Route, Switch } from 'react-router-dom';
import { Mash } from './Mash';
import { Ranking } from './Ranking';
import { CatDetails } from './CatDetails';

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
      position: relative;

      > img {
        display: block;
        height: 100%;
        margin: auto;
        position: relative;
        z-index: 2;
      }

      > h1 {
        font-family: 'GrumpyCat', sans-serif;
        font-size: 5rem;
        display: block;
        position: absolute;
        bottom: -20px;
        left: 0;
        right: 0;
        width: 400px;
        text-align: center;
        margin: auto;
        z-index: 1;
        background: -webkit-linear-gradient(0deg, #3579d7, #3f6bdf, #585ae1, #7640de, #9400d3);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
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
          <Route exact path="/cat/:id" component={CatDetails} />
        </Switch>
      </AnimatePresence>
    </motion.div>
  );
};
