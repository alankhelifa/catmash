import React from 'react';
import { TooltipProps } from 'recharts';
import { css } from 'emotion';

const tooltipStyles = css`
  background-color: var(--primary-color);
  color: var(--text-color);
  box-shadow: var(--raised-box-shadow);
  padding: var(--spacing-unit-3);
  border-radius: 4px;
`;

export const Tooltip: React.FC<TooltipProps> = ({ payload, active }) => {
  if (active && payload) {
    return (
      <div className={tooltipStyles}>
        <p>Score: {payload[0].payload.value}</p>
      </div>
    );
  }

  return null;
};
