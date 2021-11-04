import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { DataGrid, GridColDef } from '@material-ui/data-grid'
import { WithShipments } from '../components/WithShipments'

const COLUMNS: GridColDef[] = [
    {
        field: 'houseBillNumber',
        headerName: 'House Bill',
        width: 150,
    },
    {
        field: 'client',
        headerName: 'Shipper',
        width: 200,
    },
    {
        field: 'origin',
        headerName: 'Origin',
        width: 400,
    },
    {
        field: 'destination',
        headerName: 'Destination',
        width: 400,
    },
    {
        field: 'mode',
        headerName: 'Mode',
        width: 200,
    },
    {
        field: 'estimatedDeparture',
        headerName: 'Estimated Departure',
        width: 200,
    },
    {
        field: 'estimatedArrival',
        headerName: 'Estimated Arrival',
        width: 200,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 200,
    },
]

const useStyles = makeStyles({
    grid: {
        marginInline: 16,
        flexGrow: 1,
        marginBottom: 8,
    },
})

export const ShipmentsPage: React.FC = () => {
    const classes = useStyles()
    const [isAutoPageSizeOn, setIsAutoPageSizeOn] = useState(true)

    useEffect(() => {
        const MIN_WINDOW_SIZE_FOR_AUTO_PAGE_SIZE = 338

        const updateAutoPageSize = () => {
            setIsAutoPageSizeOn(window.innerHeight > MIN_WINDOW_SIZE_FOR_AUTO_PAGE_SIZE)
        }

        window.addEventListener('resize', updateAutoPageSize)
        updateAutoPageSize()

        return () => {
            window.removeEventListener('resize', updateAutoPageSize)
        }
    }, [])

    return WithShipments(({ shipments }) => (
        <DataGrid
            className={classes.grid}
            rows={shipments}
            columns={COLUMNS}
            pageSize={3}
            disableSelectionOnClick
            autoPageSize={isAutoPageSizeOn}
        />
    ))
}
