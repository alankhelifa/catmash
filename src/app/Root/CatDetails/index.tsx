import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { css } from 'emotion';
import { useParams } from 'react-router-dom';
import { CartesianGrid, ResponsiveContainer, XAxis, YAxis, AreaChart, Area, Tooltip as ChartTooltip } from 'recharts';
import { IDatabaseChange } from 'dexie-observable/api';
import db from 'database';
import { useApp } from 'stores';
import { BackButton, Cat, ScrollView, Tooltip } from 'components';
import { Cat as CatType } from 'types/cat';

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

const catVariants = {
  init: {
    y: -60,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
  },
};

const rankVariants = {
  init: {
    x: -100,
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
  },
};

const chartVariants = {
  init: {
    scale: 0.4,
    opacity: 0,
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
  },
};

const styles = css`
  overflow: hidden;

  > main {
    display: flex;
    flex-direction: column;
    justify-content: center;

    > .cat-container {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 80%;
      max-width: 1000px;
      min-height: 300px;
      margin: 60px auto 0;

      span {
        font-size: 5rem;

        @media (min-width: 992px) {
          font-size: 8rem;
        }
      }
    }

    > .score-container {
      width: 100%;
      max-width: 1000px;
      margin: 40px auto;

      > h1 {
        font-size: 2rem;
        background: -webkit-linear-gradient(0deg, #3579d7, #3f6bdf, #585ae1, #7640de, #9400d3);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      > div {
        margin-top: var(--spacing-unit-3);
        padding: var(--spacing-unit-5) var(--spacing-unit-4) var(--spacing-unit-2) 0;
        padding-bottom: var(--spacing-unit);
        background-color: var(--secondary-color);
        box-shadow: var(--box-shadow);
        border-radius: 4px;
      }
    }
  }
`;

export const CatDetails: React.FC = () => {
  const { getCat } = useApp();
  const { id } = useParams();
  const [cat, setCat] = useState<CatType>();

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
    <ScrollView>
      <motion.section className={styles} animate="enter" exit="exit" variants={variants}>
        <main>
          <BackButton to="/ranking" />
          <div className="cat-container">
            {cat && (
              <>
                <Cat {...cat} variants={catVariants} />
                <motion.span initial="init" animate="enter" exit="exit" variants={rankVariants}>
                  {cat.rank}
                </motion.span>
              </>
            )}
          </div>
          <div className="score-container">
            <h1>Evolution du score</h1>
            {cat && (
              <motion.div initial="init" animate="enter" exit="exit" variants={chartVariants}>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={cat.eloEvolution.map(elo => ({ ...elo, value: Math.floor(elo.value) }))}>
                    <defs>
                      <linearGradient id="value" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent-color)" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="var(--accent-color)" stopOpacity={0.2} />
                      </linearGradient>
                    </defs>
                    <ChartTooltip isAnimationActive={false} filterNull content={<Tooltip />} />
                    <CartesianGrid strokeDasharray="5" vertical={false} strokeWidth={1} />
                    <XAxis dataKey="date" />
                    <YAxis domain={['dataMin - 100', 'dataMax + 50']} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="var(--accent-color)"
                      fill="url(#value)"
                      fillOpacity={1}
                      strokeWidth={2}
                      dot={{ fill: 'var(--text-color)', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
            )}
          </div>
        </main>
      </motion.section>
    </ScrollView>
  );
};
