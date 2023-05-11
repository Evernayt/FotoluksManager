import { View, StyleSheet } from "react-native";
import { IconButton } from "../../components";
import { COLORS } from "../../constants/theme";
import { IconAdjustments, IconPlus, IconRefresh } from "../../assets/icons";
import { IconButtonVarians } from "../../components/UI/IconButton";
import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../../App";

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

  const navigation = useNavigation<NavigationProps>();

  const newTask = () => {
    navigation.navigate("TASKS_DETAIL_ROUTE");
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <IconButton
          icon={<IconPlus color={COLORS.primaryIcon} />}
          variant={IconButtonVarians.primary}
          onPress={newTask}
        />
        <IconButton
          icon={<IconRefresh color={COLORS.linkIcon} />}
          variant={IconButtonVarians.link}
          onPress={reload}
        />
      </View>
      <IconButton
        icon={<IconAdjustments color={COLORS.linkIcon} />}
        variant={
          filter.isActive
            ? IconButtonVarians.primaryDeemphasized
            : IconButtonVarians.link
        }
        onPress={openTasksFilterModal}
        disabled={disableFilter}
      />
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
