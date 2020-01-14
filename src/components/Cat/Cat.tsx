import React, { useCallback } from 'react';
import { css, cx } from 'emotion';
import { motion, Variants } from 'framer-motion';

const styles = css`
  height: 120px;
  width: 120px;
  padding: 6px;
  border-radius: 50%;
  background-image: linear-gradient(to top right, #3579d7, #3f6bdf, #585ae1, #7640de, #9400d3);
  box-shadow: var(--box-shadow);

  @media screen and (min-width: 992px) {
    height: 240px;
    width: 240px;
  }

  &.clickable {
    cursor: pointer;
  }

  > div {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 50%;
  }
`;

interface Props {
  className?: string;
  id: number;
  image: string;
  onClick?: (id: number) => void;
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
      className={cx(styles, className, typeof onClick === 'function' && 'clickable', 'cat')}
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
