import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IEmployee } from "../../../../models/api/IEmployee";
import { FC } from "react";
import { defaultAvatar } from "../../../../constants/images";
import { IconMinus, IconPlus } from "../../../../assets/icons";
import { COLORS, SIZES } from "../../../../constants/theme";

interface TaskDetailMemberItemProps {
  employee: IEmployee;
  isAdded: boolean;
  onClick: () => void;
}

const TaskDetailMemberItem: FC<TaskDetailMemberItemProps> = ({
  employee,
  isAdded,
  onClick,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      <View style={styles.info}>
        <Image
          style={styles.avatar}
          source={employee.avatar ? { uri: employee.avatar } : defaultAvatar}
        />
        <Text style={styles.name}>{employee.name}</Text>
      </View>
      {isAdded ? (
        <IconMinus color={COLORS.secondaryIcon} />
      ) : (
        <IconPlus color={COLORS.secondaryIcon} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.borderRadius,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    height: 32,
    width: 32,
    borderRadius: 16,
    resizeMode: "cover",
  },
  name: {
    color: COLORS.primaryText,
  },
});

export default TaskDetailMemberItem;
