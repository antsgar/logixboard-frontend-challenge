import { Box, Card, Chip, Grid, makeStyles, Typography } from '@material-ui/core'
import { Shipment, ShipmentMode, ShipmentStatus } from '../data/Shipment'
import { StatusOption } from './Dashboard'

const useStyles = makeStyles({
    card: {
        padding: 8,
    },
    cardInformationItem: {
        margin: 0,
        fontSize: '0.9rem',
    },
    shipmentModeChip: {
        marginTop: 8,
        fontSize: '0.7rem',
    },
    airShipmentMode: {
        backgroundColor: 'lightgrey',
    },
    seaShipmentMode: {
        backgroundColor: 'lightblue',
    },
    railShipmentMode: {
        backgroundColor: 'lightgreen',
    },
    shipmentIndicatorContainer: {
        alignItems: 'center',
        marginTop: 8,
        fontSize: '0.7rem',
    },
    shipmentStatusIndicator: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginRight: 4,
    },
    successShipmentStatus: {
        backgroundColor: 'green',
    },
    neutralShipmentStatus: {
        backgroundColor: 'grey',
    },
    warningShipmentStatus: {
        backgroundColor: 'orange',
    },
    errorShipmentStatus: {
        backgroundColor: 'red',
    },
})

export const ShipmentCard: React.FC<{ shipment: Shipment }> = ({ shipment }) => {
    const classes = useStyles()

    const classForShipmentMode = (mode: ShipmentMode) => {
        switch (mode) {
            case 'AIR':
                return classes.airShipmentMode
            case 'SEA':
                return classes.seaShipmentMode
            case 'RAIL':
                return classes.railShipmentMode
        }
    }

    const classForShipmentStatus = (status: ShipmentStatus) => {
        switch (status) {
            case 'ARRIVED':
                return classes.successShipmentStatus
            case 'CANCELLED':
            case 'IN_TRANSIT':
                return classes.neutralShipmentStatus
            case 'CUSTOMS_HOLD':
                return classes.warningShipmentStatus
            case 'ROLL_OVER':
            case 'TRANSPORT_ERROR':
                return classes.errorShipmentStatus
        }
    }

    return (
        <Card className={classes.card}>
            <Typography className={classes.cardInformationItem}>
                <strong>{shipment.houseBillNumber}</strong>
            </Typography>
            <Typography className={classes.cardInformationItem}>{shipment.client}</Typography>
            <Chip
                label={shipment.mode}
                size="small"
                className={`${classes.shipmentModeChip} ${classForShipmentMode(shipment.mode)}`}
            />
            <Grid container className={classes.shipmentIndicatorContainer}>
                <Box className={`${classes.shipmentStatusIndicator} ${classForShipmentStatus(shipment.status)}`} />
                <Typography variant="caption">{StatusOption[shipment.status]}</Typography>
            </Grid>
        </Card>
    )
}
