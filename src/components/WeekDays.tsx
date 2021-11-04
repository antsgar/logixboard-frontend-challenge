import { Grid, makeStyles } from "@material-ui/core"
import dayjs from "dayjs"
import { useMemo, useState } from "react"
import { Shipment } from "../data/Shipment"
import { ShipmentCard } from "./ShipmentCard"

const useStyles = makeStyles(theme => ({
  container: {
    maxHeight: '100%',
    marginBottom: 8,
  },
  title: {
    margin: 0
  },
  subtitle: {
    margin: 0,
    fontWeight: 'normal'
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
    '&:first-of-type': {
      marginTop: 16
    },
    '&:not(:last-child)': {
      marginBottom: 8
    }
  },
  shipmentCard: {
    padding: 8
  }
}))

export const WeekDays: React.FC<{ shipments: Shipment[] }> = ({ shipments }) => {
  const classes = useStyles(shipments.length)
  const DISPLAYED_DAYS = 7

  const [weekDayTitles] = useState(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const titles = ['Today', 'Tomorrow']
    for (let i = 2; i < DISPLAYED_DAYS; i++) {
      const day = days[dayjs().add(i, 'day').day()]
      titles.push(day)
    }
    return titles
  })

  const shipmentsByWeekday = useMemo(() => {
    const today = dayjs().startOf('day')
    const groupedShipments: Shipment[][] = [...Array(DISPLAYED_DAYS)].map(() => [])

    for (const shipment of shipments) {
        const { estimatedArrival } = shipment
        const arrivalDate = dayjs(estimatedArrival)
        const dateDiff = arrivalDate.diff(today, 'day')
        if (dateDiff >= 0 && dateDiff < DISPLAYED_DAYS) {
            groupedShipments[dateDiff].push(shipment)
        }
    }

    return groupedShipments
  }, [shipments])

  return <Grid container className={classes.container}>
    {shipmentsByWeekday.map((shipments, index) => (
      <Grid key={index} container item md xs={12} direction="column" className={`${classes.weekDayContainer} ${shipments.length === 0 ? classes.dimmedWeekDayContainer : ''}`}>
        <h4 className={classes.title}>
          {weekDayTitles[index]}
        </h4>
        <h5 className={classes.subtitle}>
          {shipments.length > 0 ? shipments.length : 'No'} {shipments.length === 1 ? 'shipment' : 'shipments'} arriving
        </h5>
        {shipments.map(shipment => (
          <Grid key={shipment.houseBillNumber} item className={classes.shipmentContainer}>
            <ShipmentCard shipment={shipment} />
          </Grid>
        ))}
      </Grid>
    ))}
  </Grid>
}
