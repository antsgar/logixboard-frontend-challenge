import { Dashboard } from '../components/Dashboard'
import { WithShipments } from '../components/WithShipments'

export const DashboardPage: React.FC = () => {
    return WithShipments(({ shipments }) => <Dashboard shipments={shipments} />)
}
