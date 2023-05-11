import { FC } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { useNavigation } from "@react-navigation/native";
import { taskSlice } from "../../../store/reducers/TaskSlice";
import { Button, Modal } from "../../../components";
import { StyleSheet, Text, View } from "react-native";
import { ButtonVarians } from "../../../components/UI/Button";
import { COLORS } from "../../../constants/theme";

interface TaskDetailUnsavedDataModalProps {
  isShowing: boolean;
  hide: () => void;
  saveTask: () => void;
}

const TaskDetailUnsavedDataModal: FC<TaskDetailUnsavedDataModalProps> = ({
  isShowing,
  hide,
  saveTask,
}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const closeTask = () => {
    hide();
    dispatch(taskSlice.actions.clearTask());
    navigation.goBack();
  };

  const saveTaskAndClose = () => {
    saveTask();
    closeTask();
  };

  return (
    <Modal
      title="Сохранить изменения?"
      isShowing={isShowing}
      hide={hide}
      panelStyle={styles.panel}
    >
      <Text style={styles.message}>Есть не сохраненные данные.</Text>
      <Button text="Продолжить редактирование" onPress={hide} />
      <View style={styles.controls}>
        <Button text="Нет" onPress={closeTask} />
        <Button
          text="Да"
          variant={ButtonVarians.primary}
          onPress={saveTaskAndClose}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  panel: {
    height: 212,
  },
  message: {
    color: COLORS.primaryText,
    textAlign: "center",
    marginBottom: 16
  },
  controls: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
});

export default TaskDetailUnsavedDataModal;
