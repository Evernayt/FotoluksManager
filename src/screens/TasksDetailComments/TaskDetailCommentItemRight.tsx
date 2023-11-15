import { FC } from "react";
import { ITaskMessage } from "../../models/api/ITaskMessage";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import moment from "moment";
import { DEF_DATE_FORMAT } from "../../constants/app";
import { COLORS, SIZES } from "../../constants/theme";
import { Linkify } from "../../components";

interface TaskDetailCommentItemRightProps {
  taskMessage: ITaskMessage;
  containerStyle?: StyleProp<ViewStyle>;
}

const TaskDetailCommentItemRight: FC<TaskDetailCommentItemRightProps> = ({
  taskMessage,
  containerStyle,
}) => {
  const created = moment(taskMessage.createdAt).format(DEF_DATE_FORMAT);

  const getEditedText = taskMessage.edited ? "(изменено)" : "";

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.section}>
        <Linkify>{taskMessage.message}</Linkify>
        <Text style={styles.bottom_text}>{`${getEditedText} ${created}`}</Text>
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
  bottom_text: {
    color: COLORS.secondaryText,
    fontSize: 10,
  },
});

export default TaskDetailCommentItemRight;
