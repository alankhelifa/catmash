import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    <motion.div animate="enter" exit="exit" variants={variants}>
      Mash<Link to="/ranking">Classement</Link>
    </motion.div>
  );
};
