import * as React from 'react';
import classNames from 'classnames';
import { Typography, Paper } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = () => createStyles({
  container: {
    overflow: 'hidden',
    transition: 'height 300ms ease, padding 300ms ease',
    display: 'flex',
    flexFlow: 'row',
    backgroundImage: 'url(https://images.pexels.com/photos/15382/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
    backgroundSize: 'cover',
  },
  containerExp: {
    height: '55%',
    padding: '1rem',
  },
  containerMin: {
    height: '0%',
    padding: '0',
  },
  titleContainer: {
    width: 'fit-content',
  },
  nameText: {
    color: 'white',
    fontSize: '8rem',
    width: 'fit-content',
    margin: 'none',
    textShadow: '2px 2px 2px gray',
  }
});

interface State {
  first: string;
  last: string;
}

interface Props extends WithStyles<typeof styles> {
  index: number;
}

class Title extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      first: 'Benjamin',
      last: 'Rose',
    };
  }

  render(): JSX.Element {
    const { classes } = this.props;
    return (
      <Paper 
        className={
          classNames(
            classes.container,
            this.props.index !== 0 ? classes.containerMin : classes.containerExp
          )
        }
      >
        <div>
          <Typography
            variant="headline"
            component="p"
            className={classes.nameText}
          >
            {this.state.first}
          </Typography>
          <Typography
            variant="headline"
            component="p"
            className={classes.nameText}
          >
            {this.state.last}
          </Typography>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(Title);
