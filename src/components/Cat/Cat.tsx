import React, { useCallback } from 'react';
import { css, cx } from 'emotion';
import { motion, Variants } from 'framer-motion';
import { Cat as CatType } from 'types/cat';

const styles = css`
  height: 120px;
  width: 120px;
  padding: 6px;
  border-radius: 50%;
  background-color: var(--secondary-color);
  box-shadow: var(--box-shadow);

  @media screen and (min-width: 992px) {
    height: 240px;
    width: 240px;
  }

  > div {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 50%;
  }
`;

interface Props extends CatType {
  className?: string;
  onClick?: (id: number | undefined) => void | undefined;
  variants?: Variants;
}

export const Cat: React.FC<Props> = ({ className, id, image, onClick, variants }) => {
  const handleClick = useCallback(() => {
    if (typeof onClick === 'function') {
      onClick(id);
    }
  }, [id, onClick]);

  return (
    <motion.div
      className={cx(styles, className, 'cat')}
      onClick={handleClick}
      initial="init"
      animate="enter"
      exit="exit"
      whileTap="tap"
      variants={variants}
    >
      <div style={{ backgroundImage: `url(${image})` }} />
    </motion.div>
  );
};
