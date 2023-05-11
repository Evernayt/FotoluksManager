import moment from "moment";
import { DetailHeader, IconButton } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { DEF_DATE_FORMAT } from "../../constants/app";
import TaskAPI from "../../api/TaskAPI/TaskAPI";
import { taskSlice } from "../../store/reducers/TaskSlice";
import { IconButtonVarians } from "../../components/UI/IconButton";
import { IconTrash, IconTrashOff } from "../../assets/icons";
import { COLORS } from "../../constants/theme";
import { FC } from "react";
import { View } from "react-native";

interface TasksDetailHeaderProps {
  closeTaskDetail: () => void;
}

const TasksDetailHeader: FC<TasksDetailHeaderProps> = ({ closeTaskDetail }) => {
  const task = useAppSelector((state) => state.task.task);
  const employee = useAppSelector((state) => state.employee.employee);

  const created = moment(task.createdAt).format(DEF_DATE_FORMAT);
  const title =
    task.id === 0 ? "Новая задача" : `Задача № ${task.id}\nот ${created}`;

  const dispatch = useAppDispatch();

  const toggleArchive = () => {
    TaskAPI.update({ id: task.id, archive: !task.archive }).then((data) => {
      dispatch(taskSlice.actions.setTask(data));
      dispatch(taskSlice.actions.setBeforeTask(data));
      dispatch(taskSlice.actions.setHaveUnsavedData(false));
    });
  };

  const rightSection = () => {
    return task.creator?.id === employee?.id ? (
      <IconButton
        variant={IconButtonVarians.link}
        icon={
          task.archive ? (
            <IconTrashOff color={COLORS.linkIcon} />
          ) : (
            <IconTrash color={COLORS.linkIcon} />
          )
        }
        onPress={toggleArchive}
      />
    ) : (
      <View style={{ width: 40 }} />
    );
  };

  return (
    <DetailHeader
      title={title}
      onClose={closeTaskDetail}
      rightSection={rightSection()}
    />
  );
};

export default TasksDetailHeader;
