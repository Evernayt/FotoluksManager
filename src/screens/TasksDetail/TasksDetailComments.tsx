import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppSelector } from "../../hooks/redux";
import { defaultAvatar } from "../../constants/images";
import { COLORS } from "../../constants/theme";
import { IconChevronDown } from "../../assets/icons";
import TasksDetailCommentsModal from "./Modals/CommentsModal/TasksDetailCommentsModal";
import { useModal } from "../../hooks";

const TasksDetailComments = () => {
  const taskMessages = useAppSelector((state) => state.task.taskMessages);

  const { isShowing, open, close } = useModal();

  return (
    <>
      <TasksDetailCommentsModal isShowing={isShowing} hide={close} />
      <TouchableOpacity onPress={open}>
        <Text style={styles.title}>Комментарии</Text>
        {taskMessages.length > 0 ? (
          <View style={styles.lastMessage}>
            <Image
              style={styles.avatar}
              source={
                taskMessages[0]?.employee.avatar
                  ? { uri: taskMessages[0].employee.avatar }
                  : defaultAvatar
              }
            />
            <Text numberOfLines={2} style={styles.message}>
              {taskMessages[0]?.message}
            </Text>
            <IconChevronDown color={COLORS.linkIcon} />
          </View>
        ) : (
          <Text style={styles.message}>Нет комментариев</Text>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.primaryText,
    marginBottom: 8,
  },
  lastMessage: {
    flexDirection: "row",
    gap: 8,
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18,
    resizeMode: "cover",
  },
  message: {
    color: COLORS.primaryText,
    flex: 1,
  },
});

export default TasksDetailComments;
