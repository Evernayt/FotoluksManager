import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconCheck } from "../../assets/icons";
import { COLORS } from "../../constants/theme";
import { FC } from "react";

interface CheckboxProps {
  label: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({ label, isChecked, onChange }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onChange(!isChecked)}
    >
      <View style={[styles.icon, isChecked && styles.checkedIcon]}>
        <IconCheck
          strokeWidth={4}
          width={16}
          height={16}
          color={COLORS.secondaryCheckedIcon}
        />
      </View>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  icon: {
    borderWidth: 3,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 24,
    padding: 3,
  },
  checkedIcon: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  text: {
    fontWeight: "500",
    color: COLORS.secondaryText,
    fontSize: 16,
    marginLeft: 8,
    marginTop: 3,
    flex: 1,
  },
});

export default Checkbox;
