import { FC, memo, useState } from "react";
import Modal from "react-native-modal";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { COLORS, SIZES } from "../../../../constants/theme";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { IFlatListData } from "../../../../models/IFlatListData";
import { ITaskMessage } from "../../../../models/api/ITaskMessage";
import TaskDetailCommentItemRight from "./TaskDetailCommentItemRight";
import TaskDetailCommentItemLeft from "./TaskDetailCommentItemLeft";
import { IconButton } from "../../../../components";
import { IconSend } from "../../../../assets/icons";
import { CreateTaskMessageDto } from "../../../../api/TaskMessageAPI/dto/create-task-message.dto";
import TaskMessageAPI from "../../../../api/TaskMessageAPI/TaskMessageAPI";
import { taskSlice } from "../../../../store/reducers/TaskSlice";
import NotificationAPI from "../../../../api/NotificationAPI/NotificationAPI";
import socketio from "../../../../socket/socketio";

interface TasksDetailCommentsModalProps {
  isShowing: boolean;
  hide: () => void;
}

const TasksDetailCommentsModal: FC<TasksDetailCommentsModalProps> = ({
  isShowing,
  hide,
}) => {
  const [text, setText] = useState<string>("");
  const [inputHeight, setInputHeight] = useState<number>(0);

  const task = useAppSelector((state) => state.task.task);
  const taskMessages = useAppSelector((state) => state.task.taskMessages);
  const employee = useAppSelector((state) => state.employee.employee);

  const dispatch = useAppDispatch();

  const sendMessage = () => {
    if (text.trim() !== "" && employee) {
      const message: CreateTaskMessageDto = {
        message: text,
        taskId: task.id,
        employeeId: employee.id,
      };

      TaskMessageAPI.create(message).then((data) => {
        const createdMessage: ITaskMessage = {
          ...data,
          employee,
        };
        dispatch(taskSlice.actions.addTaskMessage(createdMessage));
        notifyMembers();
        setText("");
      });
    }
  };

  const notifyMembers = () => {
    if (!task.taskMembers?.length) return;

    const employeeIds: number[] = [];
    task.taskMembers.forEach((taskMember) => {
      if (taskMember.employee.id !== employee?.id) {
        employeeIds.push(taskMember.employee.id);
      }
    });

    const title = `${employee?.name} — Задача № ${task.id}`;

    NotificationAPI.create({ title, text, employeeIds, appId: 4 }).then(
      (data) => {
        socketio.sendNotification(data);
      }
    );
  };

  const renderMessageItem = (data: IFlatListData<ITaskMessage>) => {
    return (
      <TouchableHighlight style={styles.messageItem}>
        {data.item.employee.id == employee?.id ? (
          <TaskDetailCommentItemRight taskMessage={data.item} />
        ) : (
          <TaskDetailCommentItemLeft taskMessage={data.item} />
        )}
      </TouchableHighlight>
    );
  };

  return (
    <Modal
      isVisible={isShowing}
      style={{ margin: 0 }}
      onSwipeComplete={hide}
      swipeDirection={"down"}
      useNativeDriver={false}
      propagateSwipe={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.panel}>
          <View style={styles.titleContainer}>
            <View style={styles.swipeLine} />
            <Text style={styles.title}>Комментарии</Text>
          </View>
          <FlatList
            data={taskMessages}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderMessageItem}
            showsVerticalScrollIndicator={false}
            inverted
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.messageInput,
                { height: Math.max(25, inputHeight) },
              ]}
              placeholder="Введите комментарий"
              placeholderTextColor={COLORS.secondaryText}
              value={text}
              onChangeText={setText}
              multiline={true}
              onContentSizeChange={(event) =>
                setInputHeight(event.nativeEvent.contentSize.height)
              }
            />
            <IconButton
              containerStyle={styles.sendBtn}
              icon={
                <IconSend style={styles.sendIcon} color={COLORS.linkIcon} />
              }
              onPress={sendMessage}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  panel: {
    height: "80%",
    backgroundColor: COLORS.cardBackground,
    borderTopLeftRadius: SIZES.borderRadius,
    borderTopRightRadius: SIZES.borderRadius,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  swipeLine: {
    height: 6,
    width: 50,
    borderRadius: 3,
    backgroundColor: COLORS.border,
    position: "absolute",
    top: -12,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginVertical: 24,
    color: COLORS.primaryText,
    fontWeight: "500",
  },
  messageItem: {
    paddingBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "flex-end",
  },
  messageInput: {
    backgroundColor: COLORS.background,
    maxHeight: 100,
    borderRadius: 20,
    paddingHorizontal: 24,
    fontSize: 16,
    color: COLORS.primaryText,
    flex: 1,
    marginRight: 8,
    textAlignVertical: "top",
  },
  sendBtn: {
    height: 42,
    width: 42,
    borderRadius: 21,
  },
  sendIcon: {
    transform: [{ rotate: "45deg" }],
    marginLeft: -4,
  },
});

export default memo(TasksDetailCommentsModal);
