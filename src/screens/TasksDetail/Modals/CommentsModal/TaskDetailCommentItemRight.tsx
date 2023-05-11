import { FC } from "react";
import { ITaskMessage } from "../../../../models/api/ITaskMessage";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
import { DEF_DATE_FORMAT } from "../../../../constants/app";
import { COLORS, SIZES } from "../../../../constants/theme";

interface TaskDetailCommentItemRightProps {
  taskMessage: ITaskMessage;
}

const TaskDetailCommentItemRight: FC<TaskDetailCommentItemRightProps> = ({
  taskMessage,
}) => {
  const created = moment(taskMessage.createdAt).format(DEF_DATE_FORMAT);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.message}>{taskMessage.message}</Text>
        <Text style={styles.date}>{created}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  section: {
    backgroundColor: COLORS.primaryDeemphasized,
    padding: 12,
    borderTopRightRadius: SIZES.borderRadius,
    borderTopLeftRadius: SIZES.borderRadius,
    borderBottomLeftRadius: SIZES.borderRadius,
    maxWidth: "80%",
  },
  message: {
    color: COLORS.primaryText,
  },
  date: {
    color: COLORS.secondaryText,
    fontSize: 10,
  },
});

export default TaskDetailCommentItemRight;
