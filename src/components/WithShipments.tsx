import { Box, Button, makeStyles, Typography, useTheme } from '@material-ui/core'
import React, { ReactElement } from 'react'
import Loader from 'react-loader-spinner'
import { Shipment } from '../data/Shipment'
import { useShipments } from '../data/use-shipments'

const useStyles = makeStyles({
  loader: {
      margin: 'auto',
      width: 'fit-content'
  },
  errorContainer: {
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column'
  },
  reloadButton: {
      margin: '16px auto 0',
  }
})

export const WithShipments = (PageContainer: React.FC<{ shipments: Shipment[] }>) => {
  const classes = useStyles()
  const useShipmentsResult = useShipments()
  const theme = useTheme()

  let component: ReactElement
  switch (useShipmentsResult.status) {
      case 'SUCCESS':
          component = <PageContainer shipments={useShipmentsResult.shipments} />
          break
      case 'LOADING':
          component = <Box className={classes.loader}>
              <Loader type="Grid" color={theme.palette.primary.main} />
          </Box >
          break
      case 'ERROR':
          component = <Box className={classes.errorContainer}>
                <Typography>
                    There was an error loading the shipments data. Please try again.
                </Typography>
                <Button variant="contained" color="primary" disableElevation onClick={() => window.location.reload()} className={classes.reloadButton}>
                    Reload
                </Button>
            </Box>
          break
  }

  return component
}
