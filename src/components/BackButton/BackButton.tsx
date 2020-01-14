import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { motion } from 'framer-motion';

interface Props {
  to: string;
}

const variants = {
  initial: {
    x: 75,
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: -75,
    opacity: 0,
  },
};

const styles = css`
  position: absolute;
  top: var(--spacing-unit-3);
  left: var(--spacing-unit-3);
  height: 48px;
  width: 48px;
  user-select: none;

  > a {
    display: flex;
    font-size: 3rem;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    background: -webkit-linear-gradient(0deg, #3579d7, #3f6bdf, #585ae1, #7640de, #9400d3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const BackButton: React.FC<Props> = ({ to }) => {
  return (
    <motion.span initial="initial" animate="enter" exit="exit" className={styles} variants={variants}>
      <Link to={to}>←</Link>
    </motion.span>
  );
};
