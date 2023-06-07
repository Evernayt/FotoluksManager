import { StyleSheet, View } from "react-native";
import { IconButton, Textbox } from "../../../../components";
import { IconTrash } from "../../../../assets/icons";
import { ITaskSubtask } from "../../../../models/api/ITaskSubtask";
import { FC } from "react";
import { COLORS } from "../../../../constants/theme";
import { IconButtonVariants } from "../../../../components/UI/IconButton";

interface TaskDetailSubtaskItemProps {
  taskSubtask: ITaskSubtask;
  onChange: (id: number | string, text: string) => void;
  onDelete: (id: number | string) => void;
}

const TaskDetailSubtaskItem: FC<TaskDetailSubtaskItemProps> = ({
  taskSubtask,
  onChange,
  onDelete,
}) => {
  return (
    <View style={styles.container}>
      <Textbox
        value={taskSubtask.text}
        placeholder="Введите текст"
        onChangeText={(text) => onChange(taskSubtask.id, text)}
      />
      <IconButton
        icon={<IconTrash color={COLORS.linkIcon} />}
        variant={IconButtonVariants.link}
        onPress={() => onDelete(taskSubtask.id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
});

export default TaskDetailSubtaskItem;
