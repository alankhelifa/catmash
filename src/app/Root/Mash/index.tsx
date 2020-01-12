import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import catLogo from '../../../assets/cat-logo.png';

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
    <motion.section animate="enter" exit="exit" variants={variants}>
      <header>
        <img src={catLogo} alt="Logo CatMash" />
      </header>
      <main>
        Mash<Link to="/ranking">Classement</Link>
      </main>
    </motion.section>
  );
};
