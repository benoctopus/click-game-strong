import * as React from 'react';

interface gameImageProps {
  image: any;
  passing: boolean;
  clickHandler(passing: boolean): boolean;
}

const GameImage = (props: gameImageProps): JSX.Element => (
  <div
    onClick={() => props.clickHandler(props.passing)}
   />
)

export default GameImage;
