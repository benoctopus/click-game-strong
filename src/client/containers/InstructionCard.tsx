import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const InstructionCard = (props: any): JSX.Element => (
  <Card id="instruction-card">
    <CardContent id="instruction-card-content">
      <Typography id="instruction-card-text">
        The Game of Gifs, a memory game based on your deepest desires. Dank Memes WILL be served, you WILL click on them. But Take care, Clicking on a Meme you have already consumed will result in execution ...or erm, gameOver.
      </Typography>
      <div style={{ display: 'flex', flexFlow: 'row-reverse' }}>
        <Button
          className="start-button"
          onClick={props.start}
        >
          Start
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default InstructionCard;
