import * as React from 'react';
import Card from '@material-ui/core/Card/Card';
import CardMedia from '@material-ui/core/CardMedia/CardMedia';

interface GifCard {
  url: string;
  id: string;
}

const GifCard = (props: GifCard) => (
  <Card id={props.id}>
    <CardMedia image={props.url}/>
  </Card>
);

export default GifCard;
