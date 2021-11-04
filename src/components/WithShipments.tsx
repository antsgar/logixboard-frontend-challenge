import { Box, makeStyles, useTheme } from '@material-ui/core'
import React, { ReactElement } from 'react'
import Loader from 'react-loader-spinner'
import { Shipment } from '../data/Shipment'
import { useShipments } from '../data/use-shipments'

const useStyles = makeStyles({
  loader: {
      margin: 'auto',
      width: 'fit-content'
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
          component = <p>Error</p>
          break
  }

  return component
}
