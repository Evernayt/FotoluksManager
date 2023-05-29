import { View, StyleSheet, Text, ScrollView } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import { Switch } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { appSlice } from "../../store/reducers/AppSlice";
import { IPushNotifications } from "../../models/IPushNotifications";
import { setPushNotifications } from "../../helpers/asyncStorage";

const SettingsScreen = () => {
  const pushNotifications = useAppSelector(
    (state) => state.app.pushNotifications
  );

  const dispatch = useAppDispatch();

  const notifValueChange = (
    value: boolean,
    id: number,
    key: keyof IPushNotifications
  ) => {
    const data: IPushNotifications = {
      ...pushNotifications,
      [key]: { value, id },
    };

    dispatch(appSlice.actions.setPushNotifications(data));
    setPushNotifications(data);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.panel}>
        <Text style={styles.title}>Push-уведомления</Text>
        <Switch
          containerStyle={styles.switchContainer}
          label="Вы добавлены или удалены из участников"
          value={pushNotifications.addedOrRemovedFromMembers.value}
          onValueChange={(value) =>
            notifValueChange(
              value,
              pushNotifications.addedOrRemovedFromMembers.id,
              "addedOrRemovedFromMembers"
            )
          }
        />
        <Switch
          containerStyle={styles.switchContainer}
          label="Комментарии от других сотрудников, из задач в которых вы участвуете"
          value={pushNotifications.taskComments.value}
          onValueChange={(value) =>
            notifValueChange(
              value,
              pushNotifications.taskComments.id,
              "taskComments"
            )
          }
        />
        <Switch
          containerStyle={styles.switchContainer}
          label="Изменен статус задачи"
          value={pushNotifications.taskStatusChanged.value}
          onValueChange={(value) =>
            notifValueChange(
              value,
              pushNotifications.taskStatusChanged.id,
              "taskStatusChanged"
            )
          }
        />
        <Switch
          containerStyle={styles.switchContainer}
          label="Изменен статус заказа"
          value={pushNotifications.orderStatusChanged.value}
          onValueChange={(value) =>
            notifValueChange(
              value,
              pushNotifications.orderStatusChanged.id,
              "orderStatusChanged"
            )
          }
        />
        <Switch
          containerStyle={styles.switchContainer}
          label="Изменен заказ"
          value={pushNotifications.orderChanged.value}
          onValueChange={(value) =>
            notifValueChange(
              value,
              pushNotifications.orderChanged.id,
              "orderChanged"
            )
          }
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 12,
  },
  panel: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  switchContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.primaryText,
    marginBottom: 24,
    textAlign: "center",
  },
});

export default SettingsScreen;
