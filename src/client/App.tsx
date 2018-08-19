import * as React from 'react';
import './styles/App.scss';
import Layout from './containers/Layout';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles/';
import { blue, purple } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: purple,
  },
});

class App extends React.Component {

  render(): JSX.Element {
    return (
      <MuiThemeProvider theme={theme}>
        <Layout />
      </MuiThemeProvider>
    );
  }
}

export default App;
