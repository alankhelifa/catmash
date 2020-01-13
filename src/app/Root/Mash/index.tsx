import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { AnimatePresence, motion } from 'framer-motion';
import catLogo from 'assets/cat-logo.png';
import { useApp } from 'stores';
import { Cat } from 'components';
import { Cat as CatType } from 'types/cat';

const styles = css`
  height: 100%;

  > main {
    position: relative;
    display: flex;
    max-width: 1200px;
    width: 100%;
    margin: auto;

    > .cat-container {
      flex: 1;
      padding-top: 128px;
      display: flex;

      &:first-of-type {
        padding-right: 120px;
        justify-content: flex-end;
      }

      &:last-of-type {
        padding-left: 120px;
        justify-content: flex-start;
      }
    }

    > .ranking-link-container {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      height: 40px;
      width: 180px;
      background-image: linear-gradient(to top right, #3579d7, #3f6bdf, #585ae1, #7640de, #9400d3);
      color: #ffffff;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      box-shadow: var(--box-shadow);

      > a {
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
      }
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

const leftVariants = {
  tap: {
    scale: 1.2,
  },
  init: {
    opacity: 0,
    x: -200,
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      x: { type: 'spring', stiffness: 400, damping: 35 },
    },
  },
  exit: {
    opacity: 0,
    x: -200,
    transition: {
      duration: 0.25,
    },
  },
};

const rightVariants = {
  tap: {
    scale: 1.3,
  },
  init: {
    opacity: 0,
    x: 200,
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      x: { type: 'spring', stiffness: 400, damping: 35 },
    },
  },
  exit: {
    opacity: 0,
    x: 200,
    transition: {
      duration: 0.25,
    },
  },
};

export const Mash: React.FC = () => {
  const { mash, nextMash } = useApp();
  const left = mash?.left as CatType;
  const right = mash?.right as CatType;

  const handleClick = useCallback(
    (id: number | undefined) => {
      nextMash();
    },
    [nextMash],
  );

  return (
    <motion.section animate="enter" exit="exit" variants={variants} className={styles}>
      <header>
        <img src={catLogo} alt="Logo CatMash" />
      </header>
      <main>
        <div className="cat-container">
          <AnimatePresence exitBeforeEnter>
            <Cat {...left} onClick={handleClick} key={left.id} variants={leftVariants} />
          </AnimatePresence>
        </div>
        <div className="cat-container">
          <AnimatePresence exitBeforeEnter>
            <Cat {...right} onClick={handleClick} key={right.id} variants={rightVariants} />
          </AnimatePresence>
        </div>
        <div className="ranking-link-container">
          <Link to="/ranking">Voir le classement</Link>
        </div>
      </main>
    </motion.section>
  );
};
