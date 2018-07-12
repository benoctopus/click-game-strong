import * as React from 'react';
import GameContainer from './containers/GameContainer';
import InstructionCard from './containers/InstructionCard';
import PageHeader from './presentational/PageHeader';
import './App.scss';

class App extends React.Component{
  state = {
    game: false,
  };

  renderContent = (): JSX.Element => {
    if (!this.state.game) return <InstructionCard start={this.startGame} />;
    else if (this.state.game) return <GameContainer />;
    else throw new Error('something went wrong with ui state');
  }

  startGame = ():void => {
    this.setState({ game: true });
  }

  render(): JSX.Element {
    return (
      <div id="page-wrapper">
        <PageHeader />
        {this.renderContent()}
      </div>
    );
  }
}

export default App;
