import { useNavigation, useRoute } from "@react-navigation/native";
import { BackHandler, View, StyleSheet } from "react-native";
import { RouteProps } from "../../../App";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import TaskAPI from "../../api/TaskAPI/TaskAPI";
import { taskSlice } from "../../store/reducers/TaskSlice";
import TaskMessageAPI from "../../api/TaskMessageAPI/TaskMessageAPI";
import { ITask } from "../../models/api/ITask";
import NotificationAPI from "../../api/NotificationAPI/NotificationAPI";
import socketio from "../../socket/socketio";
import { showGlobalMessage } from "../../components/GlobalMessage";
import { GlobalMessageVariants } from "../../models/IGlobalMessage";
import { UpdateTaskDto } from "../../api/TaskAPI/dto/update-task.dto";
import { CreateTaskDto } from "../../api/TaskAPI/dto/create-task.dto";
import { COLORS, SIZES } from "../../constants/theme";
import TasksDetailHeader from "./TasksDetailHeader";
import TasksDetailInfo from "./TasksDetailInfo";
import { useModal } from "../../hooks";
import TaskDetailUnsavedDataModal from "./Modals/TaskDetailUnsavedDataModal";

const TasksDetailScreen = () => {
  const { params } = useRoute<RouteProps<"TASKS_DETAIL_ROUTE">>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const haveUnsavedData = useAppSelector((state) => state.task.haveUnsavedData);
  const task = useAppSelector((state) => state.task.task);
  const employee = useAppSelector((state) => state.employee.employee);
  const taskMembersForCreate = useAppSelector(
    (state) => state.task.taskMembersForCreate
  );
  const taskMembersForDelete = useAppSelector(
    (state) => state.task.taskMembersForDelete
  );

  const isTaskCreated = task.id !== 0;

  const unsavedDataModal = useModal();

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (params?.taskId) {
      fetchTask(params.taskId);
    }
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonPress);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonPress
      );
    };
  }, [haveUnsavedData]);

  const handleBackButtonPress = () => {
    return checkUnsavedDataAndCloseTaskDetail();
  };

  const checkUnsavedDataAndCloseTaskDetail = () => {
    if (haveUnsavedData) {
      unsavedDataModal.toggle();
      return false;
    } else {
      closeTaskDetail();
      return true;
    }
  };

  const closeTaskDetail = () => {
    dispatch(taskSlice.actions.clearTask());
    dispatch(taskSlice.actions.setForceUpdate(true));
    navigation.goBack();
  };

  const fetchTask = (taskId: number) => {
    setIsLoading(true);
    TaskAPI.getOne(taskId)
      .then((data) => {
        dispatch(taskSlice.actions.setBeforeTask(data));
        dispatch(taskSlice.actions.setTask(data));

        TaskMessageAPI.getAll({ taskId }).then((data) => {
          dispatch(taskSlice.actions.setTaskMessages(data.rows.reverse()));
        });
      })
      .finally(() => setIsLoading(false));
  };

  const notifyMembersEdit = (task: ITask) => {
    if (taskMembersForCreate.length) {
      const employeeIds: number[] = [];
      taskMembersForCreate.forEach((employeeId) => {
        employeeIds.push(employeeId);
      });

      const title = "Добавлен в участники";
      const text = `${employee?.name} добавил вас в участники задачи № ${task.id}`;

      NotificationAPI.create({
        title,
        text,
        employeeIds,
        appId: 4,
        notificationCategoryId: 1,
      }).then((data) => {
        socketio.sendNotification(data, employeeIds);
      });
    }

    if (taskMembersForDelete.length) {
      const title = "Удален из участников";
      const text = `${employee?.name} удалил вас из участников задачи № ${task.id}`;

      NotificationAPI.create({
        title,
        text,
        employeeIds: taskMembersForDelete,
        appId: 4,
        notificationCategoryId: 1,
      }).then((data) => {
        socketio.sendNotification(data, taskMembersForDelete);
      });
    }
  };

  const isValidationSuccess = () => {
    if (task.shop?.id === 0) {
      showGlobalMessage("Выберите филиал", GlobalMessageVariants.warning);
      return false;
    } else if (task.department?.id === 0) {
      showGlobalMessage("Выберите отдел", GlobalMessageVariants.warning);
      return false;
    } else {
      return true;
    }
  };

  const updateTaskState = (task: ITask) => {
    dispatch(taskSlice.actions.setTask(task));
    dispatch(taskSlice.actions.saveTask(task));
    dispatch(taskSlice.actions.setHaveUnsavedData(false));

    notifyMembersEdit(task);
  };

  const saveTask = (close: boolean = false) => {
    if (!isValidationSuccess() || !haveUnsavedData || !employee) return;

    setIsLoading(true);

    if (isTaskCreated) {
      const updateBody: UpdateTaskDto = {
        ...task,
        shopId: task.shop?.id,
        departmentId: task.department?.id,
        taskMembersForCreate,
        taskMembersForDelete,
      };

      TaskAPI.update(updateBody)
        .then((data) => {
          updateTaskState(data);
        })
        .catch((e) =>
          showGlobalMessage(
            e.response.data ? e.response.data.message : e.message
          )
        )
        .finally(() => setIsLoading(false));
    } else {
      const createBody: CreateTaskDto = {
        ...task,
        shopId: task.shop?.id,
        departmentId: task.department?.id,
        creatorId: employee.id,
        taskMembersForCreate,
      };

      TaskAPI.create(createBody)
        .then((data) => {
          const taskClone: ITask = {
            ...task,
            id: data.id,
            createdAt: data.createdAt,
          };
          updateTaskState(taskClone);
        })
        .catch((e) =>
          showGlobalMessage(
            e.response.data ? e.response.data.message : e.message
          )
        )
        .finally(() => setIsLoading(false));
    }

    if (close) {
      closeTaskDetail();
    }
  };

  return (
    <>
      <TaskDetailUnsavedDataModal
        isShowing={unsavedDataModal.isShowing}
        hide={unsavedDataModal.toggle}
        saveTask={saveTask}
      />
      <View style={styles.container}>
        <TasksDetailHeader
          closeTaskDetail={checkUnsavedDataAndCloseTaskDetail}
        />
        <TasksDetailInfo isLoading={isLoading} saveTask={saveTask} />
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
  },
});

export default TasksDetailScreen;
