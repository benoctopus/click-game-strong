import * as React from 'react';
import Game from '../game/Game';
import GifCard from '../presentational/GifCard';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

interface State {
  round: number;
  gameOver: boolean;
  level: number;
  time: number;
}

class GameContainer extends React.Component<any, State, any> {
  game: Game;
  timer: any;
  constructor(props) {
    super(props);
    this.state = {
      round: 0,
      level: 0,
      gameOver: false,
      time: null,
    };
  }

  componentWillMount() {
    this.game = new Game(this.onProgress, this.gameOver);
  }

  componentDidMount() {
    this.game.startGame();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  resetTimer = (): void => {
    if (this.timer) clearInterval(this.timer);
    this.setState(
      { time: 10 },
      () => {
        this.timer = setInterval(this.tick, 1000);
      },
    );
  }

  tick = (): void => {
    if (this.state.time < 1) {
      clearInterval(this.timer);
      this.game.outOfTime();
    }
    else this.setState({ time: this.state.time - 1 });
  }

  onProgress = (gameObj: object) => {
    this.setState({ ...this.state, ...gameObj });
    if (!this.state.gameOver) {
      this.resetTimer();
    }
  }

  gameOver = () => {
    clearInterval(this.timer);
    this.setState({ gameOver: true });
  }

  restart = (): void => {
    this.setState(
      { gameOver: false },
      () => this.game.startGame(),
    );
  }

  renderCards = (): JSX.Element[] => (
    this.game.getSelected().map(
      gif => (
        <div
          key={gif.id}
          onClick={() => this.game.onClick(gif.id)}
        >
          <GifCard
            style={{ width: 'fit-content', height: 'fit-content' }}
            {...gif}
          />
        </div>
      ),
    )
  )

  render(): JSX.Element {
    const { gameOver, round, level, time } = this.state;
    return !gameOver ? (
      <div id="game-section">
        <div id="score-board">
          <Typography variant="headline" >
            Round: { round }
          </Typography>
          <Typography variant="headline" >
            Time Remaining: { time }
          </Typography>
          <Typography variant="headline" >
            Level: { level }
          </Typography>
        </div>
        <div id="card-container">
          {this.renderCards()}
        </div>
      </div>
    ) : (
      <div id="game-over">
        <h1 id="game-over-message">Game Over</h1>
        <Button
          onClick={this.restart}
        >
        Restart
        </Button>
      </div>
    );
  }
}

export default GameContainer;
