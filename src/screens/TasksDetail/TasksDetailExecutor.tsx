import { StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import moment from "moment";
import { DEF_DATE_FORMAT } from "../../constants/app";
import TaskAPI from "../../api/TaskAPI/TaskAPI";
import { taskSlice } from "../../store/reducers/TaskSlice";
import { COLORS, SIZES } from "../../constants/theme";
import { IconCheckFilled } from "../../assets/icons";
import { Button } from "../../components";

const TasksDetailExecutor = () => {
  const task = useAppSelector((state) => state.task.task);
  const employee = useAppSelector((state) => state.employee.employee);

  const date = moment(task.completedDate).format(DEF_DATE_FORMAT);

  const dispatch = useAppDispatch();

  const cancelTask = () => {
    TaskAPI.update({
      id: task.id,
      completed: false,
      completedDate: null,
      executorId: null,
    }).then((data) => {
      dispatch(taskSlice.actions.setTask(data));
      dispatch(taskSlice.actions.setBeforeTask(data));
      dispatch(taskSlice.actions.setHaveUnsavedData(false));
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.completed}>
        <IconCheckFilled color={COLORS.completedText} />
        <Text style={styles.completedText}>Завершено</Text>
      </View>
      <Text style={styles.text}>{`Исполнитель: ${task.executor?.name}`}</Text>
      <Text style={styles.text}>{`Дата и время: ${date}`}</Text>
      {(employee?.id === task.executor?.id ||
        employee?.id === task.creator?.id) && (
        <Button
          containerStyle={styles.cancelBtn}
          text="Отменить"
          onPress={cancelTask}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.completedText,
    borderRadius: SIZES.borderRadius,
    padding: 12,
  },
  completed: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  completedText: {
    color: COLORS.completedText,
    fontWeight: "500",
    marginLeft: 6,
    fontSize: 16,
    paddingBottom: 1,
  },
  text: {
    color: COLORS.primaryText,
  },
  cancelBtn: {
    marginTop: 8,
  },
});

export default TasksDetailExecutor;
