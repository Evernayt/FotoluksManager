import { FlatList, StyleSheet, Text, View, BackHandler } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import { IconMessageCircle } from "../../assets/icons";
import { ContextMenu, MessageTextbox, NavHeader } from "../../components";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { CreateTaskMessageDto } from "../../api/TaskMessageAPI/dto/create-task-message.dto";
import TaskMessageAPI from "../../api/TaskMessageAPI/TaskMessageAPI";
import { ITaskMessage } from "../../models/api/ITaskMessage";
import { taskSlice } from "../../store/reducers/TaskSlice";
import NotificationAPI from "../../api/NotificationAPI/NotificationAPI";
import socketio from "../../socket/socketio";
import { IFlatListData } from "../../models/IFlatListData";
import TaskDetailCommentItemRight from "./TaskDetailCommentItemRight";
import TaskDetailCommentItemLeft from "./TaskDetailCommentItemLeft";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../../App";
import { IContextMenuOption } from "../../components/UI/ContextMenu";
import TaskDetailEditMessageModal from "./Modals/TaskDetailEditMessageModal";
import { modalSlice } from "../../store/reducers/ModalSlice";

const TasksDetailCommentsScreen = () => {
  const [text, setText] = useState<string>("");

  const task = useAppSelector((state) => state.task.task);
  const taskMessages = useAppSelector((state) => state.task.taskMessages);
  const employee = useAppSelector((state) => state.employee.employee);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonPress);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonPress
      );
    };
  }, []);

  const handleBackButtonPress = () => {
    navigation.goBack();
    return true;
  };

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
    if (task.creator && task.creator.id !== employee?.id) {
      employeeIds.push(task.creator.id);
    }
    task.taskMembers.forEach((taskMember) => {
      if (taskMember.employee.id !== employee?.id) {
        employeeIds.push(taskMember.employee.id);
      }
    });

    const title = `${employee?.name} — Задача № ${task.id}`;

    NotificationAPI.create({
      title,
      text,
      employeeIds,
      appId: 4,
      notificationCategoryId: 2,
    }).then((data) => {
      socketio.sendNotification(data, employeeIds);
    });
  };

  const messageMenu: IContextMenuOption<ITaskMessage>[] = [
    {
      text: "Изменить",
      onPress: (taskMessage) =>
        dispatch(
          modalSlice.actions.openModal({
            modal: "taskEditMessageModal",
            props: { taskMessage },
          })
        ),
    },
  ];

  const renderMessageItem = (data: IFlatListData<ITaskMessage>) => {
    return (
      <View style={styles.messageItem}>
        {data.item.employee.id == employee?.id ? (
          <ContextMenu options={messageMenu} data={data.item}>
            <TaskDetailCommentItemRight taskMessage={data.item} />
          </ContextMenu>
        ) : (
          <TaskDetailCommentItemLeft taskMessage={data.item} />
        )}
      </View>
    );
  };

  return (
    <>
      <TaskDetailEditMessageModal />
      <View style={styles.container}>
        <NavHeader title="Комментарии" />
        <View style={styles.panel}>
          {taskMessages.length ? (
            <FlatList
              data={taskMessages}
              keyExtractor={(item) => `${item.id}`}
              renderItem={renderMessageItem}
              showsVerticalScrollIndicator={false}
              inverted
            />
          ) : (
            <View style={styles.noComments}>
              <IconMessageCircle
                color={COLORS.linkIcon}
                strokeWidth={1}
                width={48}
                height={48}
              />
              <Text style={styles.noCommentsText}>Нет комментариев</Text>
            </View>
          )}
          <MessageTextbox
            value={text}
            onChangeText={setText}
            onButtonPress={sendMessage}
          />
        </View>
      </View>
    </>
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
    flex: 1,
    borderRadius: SIZES.borderRadius,
    padding: 12,
  },
  noComments: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  noCommentsText: {
    color: COLORS.secondaryText,
  },
  messageItem: {
    paddingBottom: 8,
  },
});

export default TasksDetailCommentsScreen;
