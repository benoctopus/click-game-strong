import * as React from 'react';
import { Tab, Tabs, AppBar } from '@material-ui/core';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

const styles = () => createStyles({
  bar: {
    height: '5vh',
  },

});

interface Props extends WithStyles<typeof styles> {
  index: number;
  handleUpdateIndex: (event: React.ChangeEvent , index: number) => void;
}

const NavBar = ({ classes, index, handleUpdateIndex }: Props) => (
  <AppBar position="static" className={classes.bar}>
    <Tabs
      value={index}
      onChange={handleUpdateIndex}
    >
      <Tab label="About" value={0} />
      <Tab label="Contact" value={1} />
      <Tab label="Portfolio" value={2} />
    </Tabs>
  </AppBar>
);

export default withStyles(styles)(NavBar);
