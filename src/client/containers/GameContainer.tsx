import * as React from 'react';
import Game from '../game/Game'

// interface gameContainerState {
//   round: number;
//   playerName: string;
//   gameOver: boolean;
//   level: number;
//   setState: any;
// }

class GameContainer extends React.Component<any> {
  game: Game;
  state = {
    round: 0,
    level: 0,
    playerName: '',
    gameOver: false,
  };

  componentDidMount() {
    this.game = new Game(this.onProgress, this.gameOver);
  }

  onProgress = (gameObj: object) => {
    this.setState({ ...this.state, ...gameObj });
  }

  gameOver = () => {
    this.setState({ gameOver: true });
  }

  renderCards = (): JSX.Element[] => ();

  render(): JSX.Element {
    console.log('level', this.state.level);
    console.log('round', this.state.round);
    console.log('gameOver', this.state.gameOver);
    return(
      <div id="cardContainer">
        {/* {this.renderImages()} */}
      </div>
    );
  }
}

export default GameContainer;
