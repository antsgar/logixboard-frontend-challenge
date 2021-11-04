import { Box, Grid, makeStyles, Typography } from "@material-ui/core"
import { Shipment } from "../data/Shipment"
import { ShipmentCard } from "./ShipmentCard"

const useStyles = makeStyles(theme => ({
  weekDayContainer: {
    maxHeight: '100%',
    backgroundColor: theme.palette.primary.light,
    padding: '16px 0',
    borderRadius: 8,
    margin: '0 4px',
    '&:first-child': {
      marginLeft: 16
    },
    '&:last-child': {
      marginRight: 16
    },
    [theme.breakpoints.down('sm')]: {
      margin: '8px 16px',
      '&:first-child': {
        marginLeft: 16
      },
      '&:last-child': {
        marginRight: 16
      },
    },
    flexWrap: 'nowrap',
    overflow: 'auto'
  },
  title: {
    margin: '0 16px'
  },
  subtitle: {
    margin: '0 16px',
    fontWeight: 'normal',
    marginBottom: 16
  },
  dimmedWeekDayContainer: {
    backgroundColor: 'lightgray'
  },
  cardsContainer: {
    overflow: 'auto',
    padding: '0 16px 2px'
  },
  shipmentContainer: {
    '&:not(:last-child)': {
      marginBottom: 8
    }
  }
}))

export const WeekDayColumn: React.FC<{ title: string, shipments: Shipment[] }> = ({ title, shipments }) => {
  const classes = useStyles()

  return <Grid
    container
    item
    md
    sm={12}
    direction="column"
    className={`${classes.weekDayContainer} ${shipments.length === 0 ? classes.dimmedWeekDayContainer : ''}`}
  >
    <Typography variant="h2" className={classes.title}>
      {title}
    </Typography>
    <Typography variant="subtitle1" className={classes.subtitle}>
      {shipments.length > 0 ? shipments.length : 'No'} {shipments.length === 1 ? 'shipment' : 'shipments'} arriving
    </Typography>
    <Box className={classes.cardsContainer}>
      {shipments.map(shipment => (
        <Grid key={shipment.houseBillNumber} item className={classes.shipmentContainer}>
          <ShipmentCard shipment={shipment} />
        </Grid>
      ))}
    </Box>
  </Grid>
}
