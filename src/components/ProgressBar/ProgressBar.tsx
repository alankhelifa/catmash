import React from 'react';
import { motion } from 'framer-motion';
import { css, cx } from 'emotion';

const progressVariants = {
  init: { width: 0 },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animate: (duration: number): any => ({
    width: '100%',
    transition: {
      type: 'tween',
      ease: 'linear',
      duration: duration / 1000,
    },
  }),
};

const styles = css`
  width: 60%;
  max-width: 360px;
  height: 3px;
  background-color: var(--secondary-color);
  position: relative;
  border-radius: 2px;

  > .progress-bar {
    position: absolute;
    height: 100%;
    background-image: linear-gradient(to right, #3579d7, #3f6bdf, #585ae1, #7640de, #9400d3);
    border-radius: 2px;
  }
`;

interface Props {
  duration: number;
}

export const ProgressBar: React.FC<Props> = ({ duration }) => {
  return (
    <div className={cx(styles, 'progress')}>
      <motion.div
        animate="animate"
        initial="init"
        className="progress-bar"
        variants={progressVariants}
        custom={duration}
      />
    </div>
  );
};
