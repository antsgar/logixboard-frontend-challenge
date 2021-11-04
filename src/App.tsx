import { Box, createTheme, makeStyles, ThemeProvider } from '@material-ui/core'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import './App.css'
import { Navbar } from './components/Navbar'
import { DashboardPage } from './pages/DashboardPage'
import { ShipmentsPage } from './pages/ShipmentsPage'

const theme = createTheme({
    palette: {
        primary: {
            main: '#2AC3AD',
            light: 'rgba(42, 195, 173, 0.5)',
        },
    },
    typography: {
        h5: {
            fontSize: '1.2rem',
        },
        subtitle1: {
            fontSize: '0.8rem',
        },
    },
})

const useStyles = makeStyles({
    layoutContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
})

export const App = () => {
    const classes = useStyles()

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Box className={classes.layoutContainer}>
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
                </Box>
            </Router>
        </ThemeProvider>
    )
}
