import { View, StyleSheet } from "react-native";
import { IconButton } from "../../components";
import { COLORS } from "../../constants/theme";
import {
  IconAdjustments,
  IconCircle,
  IconCircleCheck,
  IconPlus,
  IconRefresh,
} from "../../assets/icons";
import { IconButtonVariants } from "../../components/UI/IconButton";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../../App";
import { taskSlice } from "../../store/reducers/TaskSlice";

interface TasksToolbarProps {
  reload: () => void;
  openTasksFilterModal: () => void;
}

const TasksToolbar: FC<TasksToolbarProps> = ({
  reload,
  openTasksFilterModal,
}) => {
  const filter = useAppSelector((state) => state.task.filter);
  const disableFilter = useAppSelector((state) => state.task.disableFilter);
  const selectedStatus = useAppSelector((state) => state.task.selectedStatus);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();

  const newTask = () => {
    navigation.navigate("TASKS_DETAIL_ROUTE");
  };

  const setTaskStatus = (status: 0 | 1 | 2) => {
    if (selectedStatus === status) {
      dispatch(taskSlice.actions.setSelectedStatus(0));
    } else {
      dispatch(taskSlice.actions.setSelectedStatus(status));
    }
    dispatch(taskSlice.actions.setForceUpdate(true));
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <IconButton
          icon={<IconPlus color={COLORS.primaryIcon} />}
          variant={IconButtonVariants.primary}
          onPress={newTask}
        />
        <IconButton
          icon={<IconRefresh color={COLORS.linkIcon} />}
          variant={IconButtonVariants.link}
          onPress={reload}
        />
      </View>
      <View style={styles.section}>
        <IconButton
          icon={<IconCircleCheck color={COLORS.linkIcon} />}
          variant={
            selectedStatus === 2
              ? IconButtonVariants.primaryDeemphasized
              : IconButtonVariants.link
          }
          onPress={() => setTaskStatus(2)}
        />
        <IconButton
          icon={<IconCircle color={COLORS.linkIcon} />}
          variant={
            selectedStatus === 1
              ? IconButtonVariants.primaryDeemphasized
              : IconButtonVariants.link
          }
          onPress={() => setTaskStatus(1)}
        />
        <IconButton
          icon={<IconAdjustments color={COLORS.linkIcon} />}
          variant={
            filter.isActive
              ? IconButtonVariants.primaryDeemphasized
              : IconButtonVariants.link
          }
          onPress={openTasksFilterModal}
          disabled={disableFilter}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: COLORS.separator,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    flexDirection: "row",
    gap: 8,
  },
});

export default TasksToolbar;
