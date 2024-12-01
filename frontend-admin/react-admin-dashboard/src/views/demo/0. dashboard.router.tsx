import { FundFilled } from '@ant-design/icons';
import { AdminRouterItem } from "../../router";
import DemoChart from "./chart";

const demoRoutes: AdminRouterItem[] = [
  {
    path: 'demo/chart',
    element: <DemoChart/>,
    meta: {
      label: "Dashboard",
      title: "Dashboard",
      key: "/demo/chart",
      icon: <FundFilled />,
    },
    
  }
]

export default demoRoutes
