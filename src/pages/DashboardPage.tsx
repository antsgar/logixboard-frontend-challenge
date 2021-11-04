import { WeekDays } from '../components/WeekDays'
import { WithShipments } from "../components/WithShipments"

export const DashboardPage: React.FC = () => {
    return WithShipments(({ shipments }) => <WeekDays shipments={shipments}/>)
}
