/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import messaging from "@react-native-firebase/messaging";
import { showPushNotification } from "./src/firebase/messaging";
import { getEmployee } from "./src/helpers/asyncStorage";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  if (remoteMessage.data) {
    const data = JSON.parse(remoteMessage.data.data);
    getEmployee().then((employee) => {
      const isNotifForMe = data.employeeIds.some((id) => id === employee?.id);

      if (isNotifForMe) {
        showPushNotification(data.notification);
      }
    });
  }
});

AppRegistry.registerComponent(appName, () => App);
