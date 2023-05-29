import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import store from "../store";
import { IPushNotifications } from "../models/IPushNotifications";
import { INotification } from "../models/api/INotification";
import { NOTIF_CHANEL_ID } from "../constants/app";
import { employeeSlice } from "../store/reducers/EmployeeSlice";
import { appSlice } from "../store/reducers/AppSlice";
import { IEmployee } from "../models/api/IEmployee";

interface INotificationInfo {
  notification: INotification;
  employeeIds: number[];
}

const subscribeTopic = async (topic: string) => {
  messaging().subscribeToTopic(topic);
};

const notificationListener = (employee: IEmployee) => {
  messaging().onMessage((remoteMessage) => {
    if (remoteMessage.data) {
      const data: INotificationInfo = JSON.parse(remoteMessage.data.data);
      const isNotifForMe = data.employeeIds.some((id) => id === employee?.id);

      if (isNotifForMe) {
        showPushNotification(data.notification);

        store.dispatch(
          employeeSlice.actions.addNotification(data.notification)
        );
        store.dispatch(appSlice.actions.setNoificationsBadge(true));
      }
    }
  });
};

const showPushNotification = (notification: INotification) => {
  const pushNotifications = store.getState().app.pushNotifications;
  for (const key in pushNotifications) {
    const pushNotification = pushNotifications[key as keyof IPushNotifications];
    if (pushNotification.id === notification.notificationCategoryId) {
      if (pushNotification.value) {
        PushNotification.localNotification({
          channelId: NOTIF_CHANEL_ID,
          title: notification.title,
          message: notification.text,
        });
      }
      return;
    }
  }
};

export { subscribeTopic, notificationListener, showPushNotification };
