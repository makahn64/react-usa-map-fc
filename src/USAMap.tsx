import React, { FC, MouseEvent } from 'react';
import { stateDataMap, stateKeys } from './data/usa-map-dimensions';
import { USAState } from './components/USAState';

export type MapMouseEventDataset = {
  name: string;
}

export type MapCustomizationOption = {
  fill?: string;
}

export type MapCustomizationOptionMap = Record<string, MapCustomizationOption>;

type MapProps = {
  onClick?: (stateAbbrev: string) => void;
  onClickEvent?: (event: MouseEvent<SVGPathElement>) => void;
  onMouseOver?: (stateAbbrev: string) => void;
  onMouseOverEvent?: (event: MouseEvent<SVGPathElement>) => void;
  width?: number;
  height?: number;
  title?: string;
  defaultFill?: string;
  customize?: MapCustomizationOptionMap;
}

export const USAMap: FC<MapProps> = ({
  onClick,
  onClickEvent,
  onMouseOver,
  onMouseOverEvent,
  width = 959,
  height = 593,
  defaultFill = '#d3d3d3',
  title = 'USA Map',
  customize,
}) => {

  const stateClickHandler: React.MouseEventHandler<SVGPathElement> = (event) => {

    if (onClickEvent) {
      // forward raw event
      onClickEvent(event);
    }

    if (onClick) {
      const { dataset } = event.target as SVGPathElement;
      // extract the state and call handler
      onClick((dataset as MapMouseEventDataset).name);
    }
  };

  const mouseOverHandler: React.MouseEventHandler<SVGPathElement> = (event) => {
    if (onMouseOverEvent) {
      // forward raw event
      onMouseOverEvent(event);
    }

    if (onMouseOver) {
      const { dataset } = event.target as SVGPathElement;
      // extract the state and call handler
      onMouseOver((dataset as MapMouseEventDataset).name);
    }
  };

  const fillStateColor = (state: string) => {
    // is there a custom fill for this state?
    const customFill = customize && customize[state] && customize[state].fill;
    return customFill || defaultFill;
  };

  return (
    <svg
      className="us-state-map"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 959 593"
    >
      <title>{title}</title>
      <g className="outlines">
        {stateKeys.map((key) => (
          <USAState
            key={key}
            stateName={stateDataMap[key].name}
            dimensions={stateDataMap[key].dimensions}
            state={key}
            fill={fillStateColor(key)}
            onClickState={stateClickHandler}
            onMouseEnter={mouseOverHandler}
          />
        ))}
        <g className="DC state">
          <path className="DC1" fill={fillStateColor('DC1')} d="M801.8,253.8 l-1.1-1.6 -1-0.8 1.1-1.6 2.2,1.5z" />
          <circle
            className="DC2"
            onClick={stateClickHandler}
            onMouseEnter={mouseOverHandler}
            data-name="DC"
            fill={fillStateColor('DC2')}
            stroke="#FFFFFF"
            strokeWidth="1.5"
            cx="801.3"
            cy="251.8"
            r="5"
            opacity="1"
          />
        </g>
      </g>
    </svg>
  );
};
