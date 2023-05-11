import { Image, StyleSheet, Text, View } from "react-native";
import { ITaskMessage } from "../../../../models/api/ITaskMessage";
import { FC } from "react";
import { COLORS, SIZES } from "../../../../constants/theme";
import moment from "moment";
import { DEF_DATE_FORMAT } from "../../../../constants/app";
import { defaultAvatar } from "../../../../constants/images";

interface TaskDetailCommentItemLeftProps {
  taskMessage: ITaskMessage;
}

const TaskDetailCommentItemLeft: FC<TaskDetailCommentItemLeftProps> = ({
  taskMessage,
}) => {
  const created = moment(taskMessage.createdAt).format(DEF_DATE_FORMAT);

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={
          taskMessage.employee.avatar
            ? { uri: taskMessage.employee.avatar }
            : defaultAvatar
        }
      />
      <View>
        <Text style={styles.name}>{taskMessage.employee.name}</Text>
        <View style={styles.section}>
          <Text style={styles.message}>{taskMessage.message}</Text>
          <Text style={styles.date}>{created}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    maxWidth: "70%",
  },
  avatar: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    borderRadius: 20,
    marginRight: 9,
  },
  name: {
    fontSize: 10,
    color: COLORS.secondaryText,
    marginLeft: 12,
    marginBottom: 2,
  },
  section: {
    backgroundColor: COLORS.secondaryDeemphasized,
    padding: 8,
    borderTopRightRadius: SIZES.borderRadius,
    borderTopLeftRadius: SIZES.borderRadius,
    borderBottomRightRadius: SIZES.borderRadius,
  },
  message: {
    color: COLORS.primaryText,
  },
  date: {
    color: COLORS.secondaryText,
    fontSize: 10,
  },
});

export default TaskDetailCommentItemLeft;
