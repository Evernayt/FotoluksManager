import { IconClipboardList, IconNote } from "../assets/icons";
import { OrdersScreen, TasksScreen } from "../screens";
import { ORDERS_ROUTE, TASKS_ROUTE } from "./routes";

enum Modes {
  ADD_MODE = "ADD_MODE",
  EDIT_MODE = "EDIT_MODE",
}

const INPUT_DATE_FORMAT = "YYYY-MM-DDTHH:mm";
const DEF_DATE_FORMAT = "DD.MM.YYYY HH:mm";

const NOTIF_CHANEL_ID = "fotoluks-manager";

const APPS = [
  {
    value: "TASKS",
    description: "Задачи",
    route: TASKS_ROUTE,
    Icon: IconNote,
    screen: TasksScreen,
  },
  {
    value: "ORDERS",
    description: "Заказы",
    route: ORDERS_ROUTE,
    Icon: IconClipboardList,
    screen: OrdersScreen,
  },
];

export { Modes, INPUT_DATE_FORMAT, DEF_DATE_FORMAT, APPS, NOTIF_CHANEL_ID };
