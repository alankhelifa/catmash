import React from 'react';
import { css, cx } from 'emotion';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

interface Props {
  className?: string;
}

const styles = css`
  height: 100%;
  max-width: 100%;
  .simplebar-scrollbar {
    width: 4px;
    &.simplebar-visible::before {
      opacity: 1;
    }
    &::before {
      background-image: linear-gradient(to bottom, #3579d7, #3f6bdf, #585ae1, #7640de, #9400d3);;
      width: 4px;
    },
  },
`;

export const ScrollView: React.FC<Props> = ({ className, children }) => {
  return <SimpleBar className={cx(styles, className)} children={children} />;
};
