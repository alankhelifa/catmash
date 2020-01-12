import React from 'react';
import { css } from 'emotion';
import { motion, Variant } from 'framer-motion';
import { Cat, ScrollView } from 'components';
import { useApp } from 'stores';

const styles = css`
  height: 100%;
  width: 100%;
  overflow: hidden;

  h1 {
    font-size: 2rem;
    text-align: center;
    margin: 4rem;
  }

  ul {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, auto);
    grid-gap: var(--spacing-unit-3);
    grid-auto-rows: auto;
    justify-content: center;
    margin-bottom: 64px;

    @media (min-width: 992px) {
      grid-template-columns: repeat(8, auto);
    }

    > li {
      display: flex;
      flex-direction: column;

      > span {
        padding: var(--spacing-unit-2);
        text-align: center;
      }

      > .cat {
        height: 100px;
        width: 100px;
      }

      &:nth-child(1) > .cat {
        background-color: goldenrod;
      }

      &:nth-child(2) > .cat {
        background-color: silver;
      }

      &:nth-child(3) > .cat {
        background-color: #905923;
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

const listVariants = {
  enter: {
    transition: { staggerChildren: 0.07 },
  } as Variant,
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  } as Variant,
};

const itemVariants = {
  enter: (position: number): any => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: position * 0.03,
      duration: 0.25,
      y: { stiffness: 1000, velocity: -100 },
    },
  }),
  exit: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const Ranking: React.FC = () => {
  const { cats } = useApp();

  return (
    <ScrollView>
      <motion.section className={styles} animate="enter" exit="exit" variants={variants}>
        <main>
          <div>
            <h1>Classement des chats les plus mignons</h1>
          </div>
          <motion.ul animate="enter" exit="exit" variants={listVariants} key="list">
            {cats.map((cat, index) => (
              <motion.li key={cat.id} animate="enter" exit="exit" variants={itemVariants} custom={index}>
                <Cat {...cat} />
                <span>{index + 1}</span>
              </motion.li>
            ))}
          </motion.ul>
        </main>
      </motion.section>
    </ScrollView>
  );
};
