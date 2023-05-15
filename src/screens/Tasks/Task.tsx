import { FC } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ITask } from "../../models/api/ITask";
import {
  IconBinaryTree,
  IconCalendarDue,
  IconCheckFilled,
  IconMessageCircle,
  IconStore,
} from "../../assets/icons";
import { COLORS } from "../../constants/theme";
import moment from "moment";
import { DEF_DATE_FORMAT } from "../../constants/app";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../../App";

interface TaskProps {
  task: ITask;
}

const Task: FC<TaskProps> = ({ task }) => {
  const created = moment(task.createdAt).format(DEF_DATE_FORMAT);

  const navigation = useNavigation<NavigationProps>();

  const openTask = () => {
    navigation.navigate("TASKS_DETAIL_ROUTE", {
      taskId: task.id,
      created: task.createdAt,
    });
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        task.completed && { backgroundColor: COLORS.completed },
      ]}
      onPress={openTask}
    >
      {task.completed && (
        <View style={styles.completed}>
          <IconCheckFilled color={COLORS.completedText} />
          <Text style={styles.completedText}>Завершено</Text>
        </View>
      )}
      <View style={styles.titleContainer}>
        <Text
          style={[styles.title, task.completed && styles.completedTitle]}
          numberOfLines={2}
        >{`${task.id}. ${task.title}`}</Text>
        {task.urgent && <Text style={styles.urgent}>Срочно</Text>}
      </View>

      {!task.completed && (
        <Text style={styles.description}>{task.description}</Text>
      )}
      <View style={styles.info}>
        <View style={styles.item}>
          <IconCalendarDue
            strokeWidth={1.25}
            width={20}
            height={20}
            color={COLORS.secondaryText}
          />
          <Text style={styles.itemText}>{created}</Text>
        </View>
        {task.taskMessages && task.taskMessages.length > 0 && (
          <View style={styles.item}>
            <IconMessageCircle
              strokeWidth={1.25}
              width={20}
              height={20}
              color={COLORS.secondaryText}
            />
            <Text style={styles.itemText}>{task.taskMessages.length}</Text>
          </View>
        )}
        <View style={styles.item}>
          <IconStore
            strokeWidth={1.25}
            width={20}
            height={20}
            color={COLORS.secondaryText}
          />
          <Text style={styles.itemText}>{task.shop?.abbreviation}</Text>
        </View>
        <View style={styles.item}>
          <IconBinaryTree
            strokeWidth={1.25}
            width={20}
            height={20}
            color={COLORS.secondaryText}
          />
          <Text style={styles.itemText}>{task.department?.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    padding: 12,
    gap: 4,
    minWidth: "100%",
  },
  completed: {
    flexDirection: "row",
    paddingBottom: 8,
    alignItems: "center",
    gap: 4,
  },
  completedText: {
    color: COLORS.completedText,
    fontWeight: "500",
  },
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: "500",
    color: COLORS.primaryText,
    fontSize: 15,
    flex: 1
  },
  urgent: {
    backgroundColor: COLORS.danger,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    color: "white",
    alignSelf: 'flex-start',
    marginLeft: 4
  },
  completedTitle: {
    color: COLORS.secondaryText,
    textDecorationLine: "line-through",
  },
  description: {
    color: COLORS.secondaryText,
    marginTop: 4,
  },
  info: {
    flexDirection: "row",
    columnGap: 8,
    rowGap: 4,
    flexWrap: "wrap",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  itemText: {
    color: COLORS.secondaryText,
  },
});

export default Task;
