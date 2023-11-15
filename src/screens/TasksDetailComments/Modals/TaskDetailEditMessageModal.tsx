import { MessageTextbox, Modal } from "../../../components";
import { StyleSheet, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { modalSlice } from "../../../store/reducers/ModalSlice";
import TaskDetailCommentItemRight from "../TaskDetailCommentItemRight";
import { COLORS } from "../../../constants/theme";
import { ITaskMessage } from "../../../models/api/ITaskMessage";
import TaskMessageAPI from "../../../api/TaskMessageAPI/TaskMessageAPI";
import { taskSlice } from "../../../store/reducers/TaskSlice";
import { IconEdit } from "../../../assets/icons";
import { useState } from "react";

const TaskDetailEditMessageModal = () => {
  const taskEditMessageModal = useAppSelector(
    (state) => state.modal.taskEditMessageModal
  );
  const [text, setText] = useState<string>(
    taskEditMessageModal.taskMessage?.message || ""
  );

  const taskMessages = useAppSelector((state) => state.task.taskMessages);

  const dispatch = useAppDispatch();

  const close = () => {
    dispatch(modalSlice.actions.closeModal("taskEditMessageModal"));
  };

  const editMessage = () => {
    if (!taskEditMessageModal.taskMessage) return;
    const updatedTaskMessage: ITaskMessage = {
      ...taskEditMessageModal.taskMessage,
      message: text,
      edited: true,
    };
    TaskMessageAPI.update(updatedTaskMessage).then(() => {
      const updatedTaskMessages: ITaskMessage[] = taskMessages.map((x) =>
        x.id === updatedTaskMessage.id ? updatedTaskMessage : x
      );
      dispatch(taskSlice.actions.setTaskMessages(updatedTaskMessages));
      close();
    });
  };

  return (
    <Modal
      title="Изменить комментарий"
      isShowing={taskEditMessageModal.isShowing}
      hide={close}
    >
      <Text style={styles.caution}>
        Комментарий в уведомлених не будет изменен
      </Text>
      {taskEditMessageModal.taskMessage && (
        <TaskDetailCommentItemRight
          containerStyle={styles.message}
          taskMessage={taskEditMessageModal.taskMessage}
        />
      )}
      <MessageTextbox
        value={text}
        onChangeText={setText}
        icon={<IconEdit color={COLORS.linkIcon} />}
        onButtonPress={editMessage}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  caution: {
    textAlign: "center",
    marginBottom: 12,
    color: COLORS.secondaryTextOnBg,
    fontSize: 12,
  },
  message: {
    marginBottom: 16,
  },
});

export default TaskDetailEditMessageModal;
