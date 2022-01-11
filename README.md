# react-usa-map-fc | A simple SVG USA map rendering on React

_NOTE: This is based on Gabi Davila's original implementation in class-based React Javascript. I've converted it to
a functional component and used Typescript. I've kept some of the original documentation._

Original: https://github.com/gabidavila/react-usa-map

## Installation

It requires `react` 16.13.1 or higher. Run:

`yarn add react-usa-map-fc`

or

`npm install react-usa-map-fc --save`

## Differences from Original Component
1. Written in Typescript as functional component.
2. Removed _required_ onClick handler.
3. Added `onClick` and `onClickEvent` props that give you either the full event, or just the state abbreviation.
4. Corresponding `onMouseOver` and `onMouseOverEvent` handlers added (optional as well).
5. Removed per-state handlers in the `customize` object. Didn't see a strong use case.
6. Default export removed.

## Usage


```javascript
import React, { useState } from 'react';
import {Container, Row, Col, Alert } from 'react-bootstrap';
import {MapCustomizationOptionMap, USAMap} from 'react-usa-map-fc';

function App() {

  const [ customize, setCustomize ] = useState<MapCustomizationOptionMap>({});

  const mapClickHandler = (state: string) => {
    console.log(`clicked ${state}`);
    setCustomize({ ...customize, [state]: { fill: '#00ff00'}});
  }

  const mapFlyoverHandler = (state: string) => {
    console.log(`mouse entered ${state}`);
    setCustomize({ ...customize, [state]: { fill: '#0095ff'}});
  }

  const mapClickEventHandler = (event: React.MouseEvent<SVGPathElement>) => {
    // if some typings whiz knows a better way, lemme know!
    const dataset = (event.target as SVGPathElement).dataset as MapMouseEventDataset;
    console.log(dataset);
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col/>
        <Col lg={8}>
          <Alert variant="info">react-usa-map-fc</Alert>
          <div>
            <USAMap
              onClick={mapClickHandler}
              onClickEvent={mapClickEventHandler}
              onMouseOver={mapFlyoverHandler}
              customize={customize}
              width={800}/>
          </div>
        </Col>
        <Col/>
      </Row>
    </Container>
  );
}

export default App;
```


## Props

|prop|description|required|default|
|----|-----------|--------|-------|
|`title`| Content for the Title attribute on the map `svg`| No | 'USA Map' |
|`width`| The `width` for rendering, numeric, no `px` suffix| No | 960 |
|`height`| The `height` for rendering, numeric, no `px` suffix| No | 600 |
|`defaultFill`| The default color for filling. | No |'#d3d3d3' |
|`customize`| Optional customization map for state fill colors. See below.  | No | undefined |
|`onClick` | Callback for clicking on a state. `(stateAbbreviation: string) => void`. This callback gives you just the abbreviation as a string. | No | undefined |
|`onClickEvent` | Event callback for clicking on a state. `(event:  MouseEvent<SVGPathElement>) => void`. Returns the full event. See example code below for unpacking. | No | undefined |
|`onMouseOver` | Same signature as `onClick` above. | No | undefined |
|`onMouseOverEvent` | Same signature as `onClickEvent` | No | undefined |

As type defintions:
```typescript
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
```

## Per State Fill Customization

To customize the fill for a state, add an entry in the `customize` map like so:

`const customizedStates = { 'CA': { fill: '#00ff00' }, 'NJ': { fill: '#a0c3d4} };`

Type definition is above.

# License

[MIT](LICENSE.md).

# Sources

The map is sourced from [Wikimedia](https://commons.wikimedia.org/wiki/File:Blank_US_Map_(states_only).svg) and is under 
[Creative Commons Attribution-Share Alike 3.0 Unported](https://spdx.org/licenses/CC-BY-SA-3.0.html) license. This package is inspired on the [react-us-state-map](https://npmjs.com/package/react-us-state-map) package, in fact the initial SVG class system is based on it.

# Contributing

Fork and PR. Then lemme know.

# Maintainer

Package maintained by Mitch Kahn, [website](https://github.com/makahn64).
