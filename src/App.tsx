import { createTheme, Grid, makeStyles, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import './App.css';
import { Navbar } from './components/Navbar';
import { DashboardPage } from './pages/DashboardPage';
import { ShipmentsPage } from './pages/ShipmentsPage';


const theme = createTheme({
  palette: {
    primary: {
      main: '#2AC3AD'
    }
  }
})

const useStyles = makeStyles({
  layoutContainer: {
    height: '100%',
  }
})

export const App = () => {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Grid
          container
          direction="column"
          className={classes.layoutContainer}
        >
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/dashboard">
              <DashboardPage />
            </Route>
            <Route path="/shipments">
              <ShipmentsPage />
            </Route>
          </Switch>
        </Grid>
      </Router>
    </ThemeProvider>
  );
}
