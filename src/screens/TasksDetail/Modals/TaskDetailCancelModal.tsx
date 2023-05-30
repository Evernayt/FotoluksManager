import { FC } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { taskSlice } from "../../../store/reducers/TaskSlice";
import { Button, Modal } from "../../../components";
import { StyleSheet, Text, View } from "react-native";
import { ButtonVariants } from "../../../components/UI/Button";
import { COLORS } from "../../../constants/theme";

interface TaskDetailCancelModalProps {
  isShowing: boolean;
  hide: () => void;
}

const TaskDetailCancelModal: FC<TaskDetailCancelModalProps> = ({
  isShowing,
  hide,
}) => {
  const dispatch = useAppDispatch();

  const cancel = () => {
    dispatch(taskSlice.actions.undoTask());
    hide();
  };

  return (
    <Modal
      title="Отменить изменения?"
      isShowing={isShowing}
      hide={hide}
      panelStyle={styles.panel}
    >
      <Text style={styles.message}>
        Вы уверены что хотите отменить все изменения?{`\n`}Не сохраненные данные
        будут удалены.
      </Text>
      <View style={styles.controls}>
        <Button text="Нет" onPress={hide} />
        <Button text="Да" variant={ButtonVariants.primary} onPress={cancel} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  panel: {
    height: 174,
  },
  message: {
    color: COLORS.primaryText,
    textAlign: 'center'
  },
  controls: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16
  },
});

export default TaskDetailCancelModal;
