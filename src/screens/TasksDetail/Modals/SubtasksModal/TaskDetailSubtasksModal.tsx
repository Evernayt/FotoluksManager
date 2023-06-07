import { FC } from "react";
import { Button, Modal } from "../../../../components";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import TaskDetailSubtaskItem from "./TaskDetailSubtaskItem";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "../../../../constants/theme";
import { ButtonVariants } from "../../../../components/UI/Button";
import { taskSlice } from "../../../../store/reducers/TaskSlice";
import { ITaskSubtask } from "../../../../models/api/ITaskSubtask";
import uuid from "react-native-uuid";
import { IconListCheck } from "../../../../assets/icons";

interface TaskDetailSubtasksModalProps {
  isShowing: boolean;
  hide: () => void;
}

const TaskDetailSubtasksModal: FC<TaskDetailSubtasksModalProps> = ({
  isShowing,
  hide,
}) => {
  const task = useAppSelector((state) => state.task.task);

  const dispatch = useAppDispatch();

  const createSubtask = () => {
    const createdSubtask: ITaskSubtask = {
      id: uuid.v4().toString(),
      text: "",
      completed: false,
    };
    dispatch(taskSlice.actions.addTaskSubtask(createdSubtask));
    dispatch(taskSlice.actions.addTaskSubtaskForCreate(createdSubtask));
  };

  const deleteSubTaskHandler = (id: number | string) => {
    dispatch(taskSlice.actions.deleteTaskSubtask(id));
    if (typeof id === "number") {
      dispatch(taskSlice.actions.addTaskSubtaskIdForDelete(id));
    }
  };

  const changeTextHandler = (id: number | string, text: string) => {
    dispatch(taskSlice.actions.editTaskSubtaskById({ id, text }));
    if (typeof id === "string") {
      dispatch(taskSlice.actions.editTaskSubtaskForCreate({ id, text }));
    } else if (typeof id === "number") {
      dispatch(taskSlice.actions.editTaskSubtaskForUpdate({ id, text }));
    }
  };

  return (
    <Modal title="Подзадачи" isShowing={isShowing} hide={hide}>
      <View style={styles.container}>
        {task.taskSubtasks?.length ? (
          <FlatList
            data={task.taskSubtasks}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => (
              <TaskDetailSubtaskItem
                taskSubtask={item}
                onChange={changeTextHandler}
                onDelete={deleteSubTaskHandler}
              />
            )}
            contentContainerStyle={{ gap: 8 }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.noSubtasks}>
            <IconListCheck
              color={COLORS.linkIcon}
              strokeWidth={1}
              width={48}
              height={48}
            />
            <Text style={styles.noSubtasksText}>Нет подзадач</Text>
          </View>
        )}
        <Button
          text="Добавить подзадачу"
          variant={ButtonVariants.primary}
          onPress={createSubtask}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    height: SIZES.height / 2,
  },
  noSubtasks: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  noSubtasksText: {
    color: COLORS.secondaryText,
  },
});

export default TaskDetailSubtasksModal;
