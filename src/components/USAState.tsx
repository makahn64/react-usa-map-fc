import React, { FC } from 'react';

export type StateProps = {
  dimensions: string;
  state: string;
  onClickState: React.MouseEventHandler<SVGPathElement>;
  onMouseEnter?: React.MouseEventHandler<SVGPathElement>;
  fill: string;
  stateName: string;
}

export const USAState: FC<StateProps> = ({
  dimensions,
  state,
  onClickState,
  fill,
  stateName,
  onMouseEnter,
}) => (
  <path
    d={dimensions}
    fill={fill}
    data-name={state}
    className={`${state} state`}
    onClick={onClickState}
    onMouseEnter={onMouseEnter}
  >
    <title>{stateName}</title>
  </path>
);
