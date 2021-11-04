import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, makeStyles, Typography, Checkbox, FormGroup } from "@material-ui/core"
import { useState } from "react"
import { Shipment } from "../data/Shipment"
import { WeekDays } from "./WeekDays"

enum SortOption {
  houseBillNumber = 'House Bill Number',
  client = 'Client',
  mode = 'Shipment mode',
  status = 'Shipment status'
}

enum ModeOption {
  AIR = 'AIR',
  SEA = 'SEA',
  RAIL = 'RAIL'
}

export enum StatusOption {
  ARRIVED = 'Arrived',
  IN_TRANSIT = 'In transit',
  CANCELLED = 'Cancelled',
  ROLL_OVER = 'Rolled over',
  CUSTOMS_HOLD = 'Held at customs',
  TRANSPORT_ERROR = 'Transport error'
}

const useStyles = makeStyles(theme => ({
  formControl: {
    display: 'flex',
    margin: '0 24px',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  formGroup: {
    marginTop: 16,
    display: 'flex',
    justifyContent: 'space-between',
  },
  optionFormGroup: {
    marginBottom: 16
  },
  filterFormGroup: {
    display: 'flex',
    alignItems: 'center',
    '&:not(:last-child)': {
      marginRight: 32
    }
  },
  filterLabel: {
    marginRight: 16,
    color: 'black',
    fontWeight: 'bold',
    fontSize: '0.8rem',
  }
}))

export const Dashboard: React.FC<{ shipments: Shipment[] }> = ({ shipments }) => {
  const classes = useStyles()
  const [sortProperty, setSortProperty] = useState('houseBillNumber')
  const [allowedModes, setAllowedModes] = useState(Object.keys(ModeOption))
  const [allowedStatus, setAllowedStatus] = useState(Object.keys(StatusOption))

  const handleFilterChange = (stateVariable: any[], stateUpdater: Function) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const existingItemIndex = stateVariable.findIndex(option => option === event.target.name)
    if (event.target.checked) {
      if (existingItemIndex === - 1) {
        stateUpdater([
          ...stateVariable,
          event.target.name
        ])
      }
    } else {
      if (existingItemIndex > -1) {
        stateUpdater(stateVariable.filter(option => option !== event.target.name))
      }
    }
  }

  return (
    <>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup row className={classes.formGroup}>
          <FormGroup className={classes.optionFormGroup}>
            <FormLabel component="legend">Sort by</FormLabel>
            <FormGroup row>
              <RadioGroup row aria-label="sort" name="sort" value={sortProperty} onChange={(event) => setSortProperty(event.target.value)}>
                {Object.entries(SortOption).map(([option, optionName]) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio size="small" color="primary" />}
                    label={<Typography variant="caption">{optionName}</Typography>} 
                  />
                ))}
              </RadioGroup>
            </FormGroup>
          </FormGroup>
          <FormGroup className={classes.optionFormGroup}>
            <FormLabel component="legend">Filter</FormLabel>
            <FormGroup row className={classes.filterFormGroup}>
              <FormLabel component="legend" className={classes.filterLabel}>Shipment mode</FormLabel>
              <FormGroup row className={classes.filterFormGroup}>
                {Object.entries(ModeOption).map(([option, optionName]) => (
                  <FormControlLabel
                    key={option}
                    control={<Checkbox
                        size="small"
                        color="primary"
                        name={option}
                        defaultChecked={true}
                        onChange={handleFilterChange(allowedModes, setAllowedModes)}
                      />}
                    label={<Typography variant="caption">{optionName}</Typography>}
                  />
                ))}
              </FormGroup>
              <FormLabel component="legend" className={classes.filterLabel}>Shipment status</FormLabel>
              <FormGroup row className={classes.filterFormGroup}>
                {Object.entries(StatusOption).map(([option, optionName]) => (
                  <FormControlLabel
                    key={option}
                    control={<Checkbox
                        size="small"
                        color="primary"
                        name={option}
                        defaultChecked={true}
                        onChange={handleFilterChange(allowedStatus, setAllowedStatus)}
                      />}
                    label={<Typography variant="caption">{optionName}</Typography>}
                  />
                ))}
              </FormGroup>
            </FormGroup>
          </FormGroup>
        </FormGroup>
      </FormControl>
      <WeekDays shipments={shipments} sortProperty={sortProperty} allowedModes={allowedModes} allowedStatus={allowedStatus} />
    </>
  )
}
