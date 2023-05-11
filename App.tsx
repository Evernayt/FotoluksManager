import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  LOGIN_ROUTE,
  HOME_ROUTE,
  TASKS_DETAIL_ROUTE,
  PROFILE_ROUTE,
} from "./src/constants/routes";
import {
  LoginScreen,
  ProfileScreen,
  TasksDetailScreen,
  TasksScreen,
} from "./src/screens";
import GlobalMessage from "./src/components/GlobalMessage";
import { Provider } from "react-redux";
import store from "./src/store";

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
//const Tab = createBottomTabNavigator();

// const Tabs = () => {
//   return (
//     <Tab.Navigator screenOptions={{ headerShown: false }}>
//       <Tab.Screen name={TASKS_ROUTE} component={TasksScreen} />
//     </Tab.Navigator>
//   );
// };

const App = () => {
  return (
    <Provider store={store}>
      <GlobalMessage />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={LOGIN_ROUTE}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name={LOGIN_ROUTE} component={LoginScreen} />
          <Stack.Screen name={HOME_ROUTE} component={TasksScreen} />
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
