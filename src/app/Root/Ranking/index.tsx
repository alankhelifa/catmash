import React, { useEffect, useState } from 'react';
import { css } from 'emotion';
import { motion, Variant } from 'framer-motion';
import { BackButton, Cat, ScrollView } from 'components';
import { useApp } from 'stores';
import { Cats } from 'types/cat';
import { Link } from 'react-router-dom';
import db from 'database';

const styles = css`
  overflow: hidden;

  main {
    h1 {
      font-size: 2rem;
      text-align: center;
      margin: 4rem;
      background: -webkit-linear-gradient(0deg, #3579d7, #3f6bdf, #585ae1, #7640de, #9400d3);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    ul {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, auto);
      grid-gap: var(--spacing-unit-3);
      grid-auto-rows: auto;
      justify-content: center;
      margin-bottom: 64px;

      @media (min-width: 500px) {
        grid-template-columns: repeat(4, auto);
      }

      @media (min-width: 992px) {
        grid-template-columns: repeat(6, auto);
      }

      @media (min-width: 1200px) {
        grid-template-columns: repeat(8, auto);
      }

      > li {
        display: flex;
        flex-direction: column;

        > span {
          padding: var(--spacing-unit-2);
          text-align: center;
        }

        > a > .cat {
          height: 100px;
          width: 100px;
        }

        &:nth-child(1) > a > .cat {
          background-color: goldenrod;
        }

        &:nth-child(2) > a > .cat {
          background-color: silver;
        }

        &:nth-child(3) > a > .cat {
          background-color: #905923;
        }
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

const catVariants = {
  tap: {
    scale: 1.2,
  },
};

const spring = {
  type: 'spring',
  damping: 60,
  stiffness: 300,
};

export const Ranking: React.FC = () => {
  const { getCats } = useApp();
  const [cats, setCats] = useState<Cats>();

  useEffect(() => {
    const load = (): void => {
      getCats().then(setCats);
    };

    load();
    db.on('changes', load);

    return (): void => db.on('changes').unsubscribe(load);
  }, [getCats]);

  return (
    <ScrollView>
      <motion.section className={styles} animate="enter" exit="exit" variants={variants}>
        <main>
          <BackButton to="/" />
          <div>
            <h1>Classement des chats les plus mignons</h1>
          </div>
          <motion.ul animate="enter" exit="exit" variants={listVariants} key="list">
            {cats &&
              cats.map((cat, index) => (
                <motion.li
                  key={cat.id}
                  animate="enter"
                  exit="exit"
                  variants={itemVariants}
                  custom={index}
                  positionTransition={spring}
                >
                  <Link to={`/cat/${cat.id}`}>
                    <Cat {...cat} variants={catVariants} />
                  </Link>
                  <span>{index + 1}</span>
                </motion.li>
              ))}
          </motion.ul>
        </main>
      </motion.section>
    </ScrollView>
  );
};
