import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { motion } from 'framer-motion';
import catLogo from 'assets/cat-logo.png';

const styles = css`
  height: 100%;

  > main {
    position: relative;

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

export const Mash: React.FC = () => {
  return (
    <motion.section animate="enter" exit="exit" variants={variants} className={styles}>
      <header>
        <img src={catLogo} alt="Logo CatMash" />
      </header>
      <main>
        <div className="ranking-link-container">
          <Link to="/ranking">Voir le classement</Link>
        </div>
      </main>
    </motion.section>
  );
};
