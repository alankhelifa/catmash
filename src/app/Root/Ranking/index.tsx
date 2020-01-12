import React from 'react';
import { motion } from 'framer-motion';
import { Cat } from 'components';
import { useApp } from 'stores';

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

export const Ranking: React.FC = () => {
  const { cats } = useApp();

  return (
    <motion.div animate="enter" exit="exit" variants={variants}>
      <ul>
        {cats.map(cat => (
          <motion.li key={cat.id}>
            <Cat {...cat} />
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};
