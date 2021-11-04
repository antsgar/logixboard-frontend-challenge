import { Grid, makeStyles } from "@material-ui/core"
import dayjs from "dayjs"
import { useMemo, useState } from "react"
import { Shipment } from "../data/Shipment"
import { WeekDayColumn } from "./WeekDayColumn"

const useStyles = makeStyles(theme => ({
  container: {
    maxHeight: '100%',
    marginBottom: 8,
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
      <WeekDayColumn key={index} shipments={shipments} title={weekDayTitles[index]} />
    ))}
  </Grid>
}
