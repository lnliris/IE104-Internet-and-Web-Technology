import { FundFilled } from '@ant-design/icons';
import { AdminRouterItem } from "../../router";
import Showtimes from '.';

const demoRoutes: AdminRouterItem[] = [
  {
    path: 'showtime',
    element: <Showtimes/>,
    meta: {
      label: "Lịch chiếu",
      title: "Lịch chiếu",
      key: "/showtime",
      icon: <FundFilled />,
    },
    
  }
]

export default demoRoutes
