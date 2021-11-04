import { Grid, makeStyles } from "@material-ui/core"
import dayjs from "dayjs"
import { useMemo, useState } from "react"
import { Shipment } from "../data/Shipment"
import { WeekDayColumn } from "./WeekDayColumn"

const useStyles = makeStyles(theme => ({
  container: {
    overflow: 'hidden',
    marginBottom: 8,
  }
}))

export const WeekDays: React.FC<{ shipments: Shipment[], sortProperty: string, allowedModes: string[], allowedStatus: string[] }> = ({
  shipments,
  sortProperty,
  allowedModes,
  allowedStatus
}) => {
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

  console.log(allowedModes)

  const shipmentsByWeekday = useMemo(() => {
    const today = dayjs().startOf('day')
    const filteredShipments = shipments.filter(shipment => allowedModes.includes(shipment.mode) && allowedStatus.includes(shipment.status))
    const sortedShipments = (filteredShipments as { [key: string]: any }[]).sort((shipmentA, shipmentB) => {
      if (shipmentA[sortProperty] > shipmentB[sortProperty]) {
        return 1
      }
      if (shipmentB[sortProperty] > shipmentA[sortProperty]) {
        return -1
      }
      return 0
    }) as Shipment[]
    const groupedShipments: Shipment[][] = [...Array(DISPLAYED_DAYS)].map(() => [])

    for (const shipment of sortedShipments) {
        const { estimatedArrival } = shipment
        const arrivalDate = dayjs(estimatedArrival)
        const dateDiff = arrivalDate.diff(today, 'day')
        if (dateDiff >= 0 && dateDiff < DISPLAYED_DAYS) {
            groupedShipments[dateDiff].push(shipment)
        }
    }

    return groupedShipments
  }, [shipments, sortProperty, allowedModes, allowedStatus])

  return <Grid container className={classes.container}>
    {shipmentsByWeekday.map((shipments, index) => (
      <WeekDayColumn key={index} shipments={shipments} title={weekDayTitles[index]} />
    ))}
  </Grid>
}
