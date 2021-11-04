import { Grid, makeStyles, Typography } from "@material-ui/core"
import { Shipment } from "../data/Shipment"
import { ShipmentCard } from "./ShipmentCard"

const useStyles = makeStyles(theme => ({
  title: {
    margin: 0
  },
  subtitle: {
    margin: 0,
    fontWeight: 'normal',
    marginBottom: 16
  },
  weekDayContainer: {
    maxHeight: '100%',
    backgroundColor: theme.palette.primary.light,
    padding: 16,
    borderRadius: 8,
    [theme.breakpoints.up('md')]: {
      margin: '0 4px',
      '&:first-child': {
        marginLeft: 16
      },
      '&:last-child': {
        marginRight: 16
      },
    },
    [theme.breakpoints.down('md')]: {
      margin: '4px 8px',
      '&:first-child': {
        marginTop: 16
      },
      '&:last-child': {
        marginBottom: 16
      },
    },
    flexWrap: 'nowrap',
    overflow: 'auto'
  },
  dimmedWeekDayContainer: {
    backgroundColor: 'lightgray'
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
    xs={12}
    direction="column"
    className={`${classes.weekDayContainer} ${shipments.length === 0 ? classes.dimmedWeekDayContainer : ''}`}
  >
    <Typography variant="h2" className={classes.title}>
      {title}
    </Typography>
    <Typography variant="subtitle1" className={classes.subtitle}>
      {shipments.length > 0 ? shipments.length : 'No'} {shipments.length === 1 ? 'shipment' : 'shipments'} arriving
    </Typography>
    {shipments.map(shipment => (
      <Grid key={shipment.houseBillNumber} item className={classes.shipmentContainer}>
        <ShipmentCard shipment={shipment} />
      </Grid>
    ))}
  </Grid>
}
