import { FC, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IShop } from "../../models/api/IShop";
import { IDepartment } from "../../models/api/IDepartment";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { taskSlice } from "../../store/reducers/TaskSlice";
import ShopAPI from "../../api/ShopAPI/ShopAPI";
import DepartmentAPI from "../../api/DepartmentAPI/DepartmentAPI";
import TaskAPI from "../../api/TaskAPI/TaskAPI";
import {
  AvatarList,
  Button,
  Checkbox,
  IconButton,
  KeyboardAvoidingWrapper,
  Linkify,
  Loader,
  SelectButton,
  Switch,
  Textarea,
  Textbox,
} from "../../components";
import { ButtonVariants } from "../../components/UI/Button";
import { COLORS, SIZES } from "../../constants/theme";
import TasksDetailExecutor from "./TasksDetailExecutor";
import {
  IconBinaryTree,
  IconDeviceFloppy,
  IconEye,
  IconEyeOff,
  IconRotate2,
  IconStore,
} from "../../assets/icons";
import { IAvatarListItem } from "../../components/UI/AvatarList";
import TaskDetailMembersModal from "./Modals/MembersModal/TaskDetailMembersModal";
import { useModal } from "../../hooks";
import TaskDetailCancelModal from "./Modals/TaskDetailCancelModal";
import TasksDetailComments from "./TasksDetailComments";
import { IconButtonVariants } from "../../components/UI/IconButton";
import TaskDetailSubtasksModal from "./Modals/SubtasksModal/TaskDetailSubtasksModal";
import TaskSubtaskAPI from "../../api/TaskSubtaskAPI/TaskSubtaskAPI";
import { showGlobalMessage } from "../../components/GlobalMessage";

interface TasksDetailInfoProps {
  isLoading: boolean;
  saveTask: (close: boolean) => void;
  closeTaskDetail: () => void;
}

const TasksDetailInfo: FC<TasksDetailInfoProps> = ({
  isLoading,
  saveTask,
  closeTaskDetail,
}) => {
  const [shops, setShops] = useState<IShop[]>([]);
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [completionNote, setCompletionNote] = useState<string>("");
  const [viewMode, setViewMode] = useState<boolean>(false);

  const task = useAppSelector((state) => state.task.task);
  const beforeTask = useAppSelector((state) => state.task.beforeTask);
  const title = useAppSelector((state) => state.task.task.title);
  const description = useAppSelector((state) => state.task.task.description);
  const shop = useAppSelector((state) => state.task.task.shop);
  const department = useAppSelector((state) => state.task.task.department);
  const urgent = useAppSelector((state) => state.task.task.urgent);
  const haveUnsavedData = useAppSelector((state) => state.task.haveUnsavedData);
  const employee = useAppSelector((state) => state.employee.employee);

  const isTaskCreated = task.id !== 0;
  const iCreator = task.creator ? task.creator.id === employee?.id : true;

  const taskSubtasksModal = useModal();
  const taskMembersModal = useModal();
  const cancelTaskModal = useModal();

  const taskMembers = useMemo(() => {
    const employees: IAvatarListItem[] = [];
    task.taskMembers?.forEach((taskMember) => {
      employees.push({
        id: taskMember.employee.id,
        name: taskMember.employee.name,
        avatar: taskMember.employee.avatar,
      });
    });
    return employees;
  }, [task.taskMembers]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchShops();
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (viewMode) return;
    JSON.stringify(task) != JSON.stringify(beforeTask)
      ? dispatch(taskSlice.actions.setHaveUnsavedData(true))
      : dispatch(taskSlice.actions.setHaveUnsavedData(false));
  }, [task]);

  const fetchShops = () => {
    ShopAPI.getAll({ isIncludeGeneral: true }).then((data) => {
      setShops(data.rows);
    });
  };

  const fetchDepartments = () => {
    DepartmentAPI.getAll({ isIncludeGeneral: true }).then((data) => {
      setDepartments(data.rows);
    });
  };

  const completeTask = () => {
    TaskAPI.update({
      id: task.id,
      completed: true,
      completedDate: new Date().toUTCString(),
      completionNote,
      executorId: employee?.id,
    }).then((data) => {
      dispatch(taskSlice.actions.setTask(data));
      dispatch(taskSlice.actions.setBeforeTask(data));
      dispatch(taskSlice.actions.setHaveUnsavedData(false));
    });
  };

  const toggleSubtask = (id: number | string, completed: boolean) => {
    if (typeof id === "string") return;

    dispatch(taskSlice.actions.editTaskSubtaskById({ id, completed }));
    TaskSubtaskAPI.update({ id, completed }).catch((e) => {
      showGlobalMessage(e.response.data ? e.response.data.message : e.message);
      dispatch(
        taskSlice.actions.editTaskSubtaskById({ id, completed: !completed })
      );
    });
  };

  const openCancelModal = () => {
    cancelTaskModal.open();
  };

  const openTaskSubtasksModal = () => {
    taskSubtasksModal.open();
  };

  const openTaskMembersModal = () => {
    taskMembersModal.open();
  };

  const toggleUrgent = () => {
    dispatch(taskSlice.actions.setUrgent(!urgent));
  };

  const taskCompletedRender = () => {
    return task.completed ? (
      <TasksDetailExecutor />
    ) : (
      <View style={styles.panels}>
        <Button
          text="Завершить"
          variant={ButtonVariants.primaryDeemphasized}
          onPress={completeTask}
        />
        <Textbox
          label="Примечание (необязательно)"
          labelBgColor={COLORS.cardBackground}
          value={completionNote}
          onChangeText={setCompletionNote}
        />
      </View>
    );
  };

  const editingRender = () => {
    return (
      <>
        <TaskDetailSubtasksModal
          isShowing={taskSubtasksModal.isShowing}
          hide={taskSubtasksModal.close}
        />
        <TaskDetailMembersModal
          isShowing={taskMembersModal.isShowing}
          hide={taskMembersModal.close}
        />
        <View style={styles.inputs}>
          <Textarea
            label="Заголовок"
            labelBgColor={COLORS.cardBackground}
            value={title}
            onChangeText={(text) => dispatch(taskSlice.actions.setTitle(text))}
          />
          <Textarea
            label="Описание"
            labelBgColor={COLORS.cardBackground}
            value={description}
            onChangeText={(text) =>
              dispatch(taskSlice.actions.setDescription(text))
            }
          />
          <Button
            text={
              task.taskSubtasks && task.taskSubtasks.length > 0
                ? `Список подзадач: ${task.taskSubtasks.length}`
                : "Добавить подзадачи"
            }
            onPress={openTaskSubtasksModal}
          />
          <SelectButton
            title="Филиалы"
            items={shops}
            defaultSelectedItem={shop}
            onChange={(item) => dispatch(taskSlice.actions.setShop(item))}
          />
          <SelectButton
            title="Отделы"
            items={departments}
            defaultSelectedItem={department}
            onChange={(item) => dispatch(taskSlice.actions.setDepartment(item))}
          />
          <Button
            text={
              task.taskMembers && task.taskMembers.length > 0
                ? `Список участников: ${task.taskMembers.length}`
                : "Добавить участников"
            }
            onPress={openTaskMembersModal}
          />
          <Switch label="Срочно" value={urgent} onValueChange={toggleUrgent} />
        </View>
      </>
    );
  };

  const readingRender = () => {
    return (
      <>
        <View style={styles.items}>
          {task.urgent && <Text style={styles.urgent}>Срочно</Text>}
          <View style={styles.item}>
            <IconStore
              strokeWidth={1.25}
              width={20}
              height={20}
              color={COLORS.secondaryText}
            />
            <Text style={styles.itemText}>{shop?.abbreviation}</Text>
          </View>
          <View style={styles.item}>
            <IconBinaryTree
              strokeWidth={1.25}
              width={20}
              height={20}
              color={COLORS.secondaryText}
            />
            <Text style={styles.itemText}>{department?.name}</Text>
          </View>
          <View style={styles.item}>
            <Text
              style={styles.itemText}
            >{`Создатель: ${task.creator?.name}`}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.title}>Заголовок</Text>
          <Linkify>{title}</Linkify>
        </View>
        <View>
          <Text style={styles.title}>Описание</Text>
          <Linkify>{description}</Linkify>
        </View>
        <View style={styles.subtasks}>
          {task.taskSubtasks?.map((taskSubtask) => (
            <Checkbox
              label={taskSubtask.text}
              isChecked={taskSubtask.completed}
              onChange={(isChecked) => toggleSubtask(taskSubtask.id, isChecked)}
              key={taskSubtask.id}
            />
          ))}
        </View>
        {taskMembers.length > 0 && (
          <View>
            <Text style={styles.title}>Участники</Text>
            <AvatarList items={taskMembers} title="Участники" />
          </View>
        )}
      </>
    );
  };

  return isLoading ? (
    <View style={[styles.container, styles.panel]}>
      <Loader />
    </View>
  ) : (
    <>
      <TaskDetailCancelModal
        isShowing={cancelTaskModal.isShowing}
        hide={cancelTaskModal.close}
      />
      <View style={styles.container}>
        <KeyboardAvoidingWrapper>
          <View style={styles.panels}>
            {isTaskCreated && (
              <View style={styles.panel}>{taskCompletedRender()}</View>
            )}
            <View style={styles.panel}>
              <View style={styles.info}>
                {iCreator && !viewMode ? editingRender() : readingRender()}
              </View>
            </View>
            {isTaskCreated && (
              <View style={styles.panel}>
                <TasksDetailComments />
              </View>
            )}
          </View>
        </KeyboardAvoidingWrapper>
        {iCreator && (
          <View style={styles.panel}>
            <View style={styles.controls}>
              {haveUnsavedData ? (
                <>
                  <IconButton
                    containerStyle={styles.controlIcon}
                    icon={<IconRotate2 color={COLORS.secondaryIcon} />}
                    onPress={openCancelModal}
                  />
                  <IconButton
                    containerStyle={styles.controlIcon}
                    variant={IconButtonVariants.primary}
                    icon={<IconDeviceFloppy color={COLORS.primaryIcon} />}
                    onPress={() => saveTask(false)}
                  />
                  <Button
                    text="Сохранить и выйти"
                    variant={ButtonVariants.primary}
                    onPress={() => saveTask(true)}
                  />
                </>
              ) : (
                <>
                  {isTaskCreated && (
                    <IconButton
                      containerStyle={styles.controlIcon}
                      icon={
                        viewMode ? (
                          <IconEyeOff color={COLORS.secondaryIcon} />
                        ) : (
                          <IconEye color={COLORS.secondaryIcon} />
                        )
                      }
                      onPress={() => setViewMode((prevState) => !prevState)}
                    />
                  )}
                  <Button
                    text="Выйти"
                    variant={ButtonVariants.primary}
                    onPress={closeTaskDetail}
                  />
                </>
              )}
            </View>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  panels: {
    gap: 8,
  },
  panel: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.borderRadius,
    padding: 8,
  },
  info: {
    gap: 16,
    paddingBottom: 24,
  },
  controls: {
    flexDirection: "row",
    gap: 8,
  },
  controlIcon: {
    height: 48,
    width: 48,
  },
  inputs: {
    gap: 8,
  },
  items: {
    flexDirection: "row",
    columnGap: 8,
    rowGap: 4,
    flexWrap: "wrap",
  },
  urgent: {
    backgroundColor: COLORS.danger,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    color: "white",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  itemText: {
    color: COLORS.secondaryText,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.primaryText,
    marginBottom: 2,
  },
  subtasks: {
    gap: 8,
  },
});

export default TasksDetailInfo;
