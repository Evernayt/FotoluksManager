import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { FC } from "react";
import { COLORS } from "../constants/theme";
import { IconClipboardList, IconNote, IconSettings } from "../assets/icons";
import { ORDERS_ROUTE, SETTINGS_ROUTE, TASKS_ROUTE } from "../constants/routes";

interface TabButtonProps {
  focused: boolean;
  name: string;
  onPress: () => void;
}

const TabButton: FC<TabButtonProps> = ({ focused, name, onPress }) => {
  const getIcon = () => {
    const color = focused ? COLORS.primaryIcon : COLORS.linkIcon;

    if (name === TASKS_ROUTE) {
      return <IconNote color={color} />;
    } else if (name === ORDERS_ROUTE) {
      return <IconClipboardList color={color} />;
    } else if (name === SETTINGS_ROUTE) {
      return <IconSettings color={color} />;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, focused && styles.focusedContainer]}
      disabled={focused}
      onPress={onPress}
    >
      {getIcon()}
      {focused && <Text style={styles.name}>{name}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 8,
    borderRadius: 40,
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  focusedContainer: {
    backgroundColor: COLORS.primaryDeemphasized,
    paddingHorizontal: 20,
    flex: 1.5,
  },
  name: {
    color: COLORS.primaryText,
    fontWeight: "500",
    marginBottom: 2,
  },
});

export default TabButton;
