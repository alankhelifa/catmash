import React from 'react';
import { css } from 'emotion';
import { motion } from 'framer-motion';
import loadingGif from 'assets/loader.gif';
import { ProgressBar } from 'components';

interface Props {
  label?: string;
  timeout: number;
}

const styles = css`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > img {
    width: 60%;
    max-width: 380px;
  }

  > .label {
    margin-top: 50px;
    height: 2rem;
    font-size: 1.4rem;
  }

  > .progress {
    margin-top: 50px;
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
    transition: {
      duration: 0.4,
    },
  },
};

export const LoadingPage: React.FC<Props> = ({ label, timeout }) => {
  return (
    <motion.div className={styles} animate="enter" exit="exit" variants={variants}>
      <img src={loadingGif} alt="Chargement..." />
      <div className="label">{label}</div>
      <ProgressBar duration={timeout} />
    </motion.div>
  );
};
