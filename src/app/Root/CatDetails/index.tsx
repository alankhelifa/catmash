import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useApp } from 'stores';
import { Cat } from 'types/cat';
import db from 'database';
import { IDatabaseChange } from 'dexie-observable/api';

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

export const CatDetails: React.FC = () => {
  const { getCat } = useApp();
  const { id } = useParams();
  const [cat, setCat] = useState<Cat>();

  useEffect(() => {
    const load = (): void => {
      if (id) {
        getCat(parseInt(id)).then(setCat);
      }
    };

    const subscription = (changes: IDatabaseChange[]): void => {
      if (id) {
        const shouldReload = changes.find(change => change.key === parseInt(id));
        if (shouldReload) {
          load();
        }
      }
    };

    load();
    db.on('changes', subscription);

    return (): void => db.on('changes').unsubscribe(subscription);
  }, [getCat, id]);

  return (
    <motion.div animate="enter" exit="exit" variants={variants}>
      {JSON.stringify(cat)}
    </motion.div>
  );
};
