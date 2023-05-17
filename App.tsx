import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  LOGIN_ROUTE,
  HOME_ROUTE,
  TASKS_DETAIL_ROUTE,
  PROFILE_ROUTE,
  SETTINGS_ROUTE,
} from "./src/constants/routes";
import {
  LoginScreen,
  ProfileScreen,
  SettingsScreen,
  TasksDetailScreen,
} from "./src/screens";
import GlobalMessage from "./src/components/GlobalMessage";
import { Provider } from "react-redux";
import store from "./src/store";
import { request, PERMISSIONS } from "react-native-permissions";
import PushNotification from "react-native-push-notification";
import { useEffect, useMemo } from "react";
import { NOTIF_CHANEL_ID } from "./src/constants/app";
import { useAppSelector } from "./src/hooks/redux";
import { getApps } from "./src/helpers";
import { TabBar } from "./src/components";

type RootStackParamList = {
  LOGIN_ROUTE: undefined;
  HOME_ROUTE: undefined;
  TASKS_DETAIL_ROUTE: { taskId: number; created: string } | undefined;
  PROFILE_ROUTE: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
export type RouteProps<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  const employee = useAppSelector((state) => state.employee.employee);

  const apps = useMemo(() => getApps(employee?.apps), [employee?.apps]);

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      {apps.map((app) => (
        <Tab.Screen name={app.route} component={app.screen} key={app.route} />
      ))}
      <Tab.Screen name={SETTINGS_ROUTE} component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const requestNotifications = () => {
  request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then(() => {
    PushNotification.createChannel(
      { channelId: NOTIF_CHANEL_ID, channelName: "Fotoluks Manager" },
      () => {}
    );
  });
};

const App = () => {
  useEffect(() => {
    requestNotifications();
  }, []);

  return (
    <Provider store={store}>
      <GlobalMessage />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={LOGIN_ROUTE}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name={LOGIN_ROUTE} component={LoginScreen} />
          <Stack.Screen name={HOME_ROUTE} component={Tabs} />
          <Stack.Screen
            name={TASKS_DETAIL_ROUTE}
            component={TasksDetailScreen}
          />
          <Stack.Screen name={PROFILE_ROUTE} component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
