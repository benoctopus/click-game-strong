import * as React from 'react';
import Title from '../presentational/Title';
import Navbar from '../presentational/Navbar';
import Swipe from 'react-swipeable-views';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { Zoom } from '@material-ui/core';

const styles = () => createStyles({
  pageContainer: {
    width: '100vw',
    height: '100vh',
    background: 'white',
  },
  contentContainer: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  subContainer: {
    height: '100%',
  }
});

interface State {
  index: number;
  action: boolean;
}

class Layout extends React.Component<WithStyles<typeof styles>, State> {
  constructor(props: WithStyles<typeof styles>) {
    super(props);
    this.state = {
      index: 0,
      action: true,
    };
  }

  componentDidMount(): void {
    // setTimeout(() => {
    //   this.setState({action: true})
    // }, 500);
  }

  handleUpdateIndex = (event: React.ChangeEvent, index: number): void => {
    if (this.state.index !== index && event !== null) {
      this.setState({ index });
    }
  }

  render(): JSX.Element {
    const { classes } = this.props;
    return (
      <Zoom in={this.state.action}>
        <div className={classes.pageContainer}>
          <Title index={this.state.index} />
          <Navbar
            index={this.state.index}
            handleUpdateIndex={this.handleUpdateIndex}
          />
            <Swipe
              index={this.state.index}
              className={classes.contentContainer}
              style={{
                height: this.state.index !== 0 ? '95vh' : 'calc(100% - 55% - 5vh)',
              }}
              >
              <div className={classes.subContainer}>
                <p>test</p>
              </div>
              <div className={classes.subContainer}>
                <p>test</p>
              </div>
              <div className={classes.subContainer}>
                <p>test</p>
              </div>
            </Swipe>
          </div>
      </Zoom>
    );
  }
}

export default withStyles(styles)(Layout);
