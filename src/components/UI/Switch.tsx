import { FC } from "react";
import {
  Switch as RNSwitch,
  SwitchProps as RNSwitchProps,
} from "react-native-switch";
import { COLORS } from "../../constants/theme";
import { StyleSheet, Text, View } from "react-native";

interface SwitchProps extends RNSwitchProps {
  label: string;
}

const Switch: FC<SwitchProps> = ({ label, ...props }) => {
  return (
    <View style={styles.container}>
      <RNSwitch
        circleBorderWidth={3}
        circleBorderActiveColor={COLORS.primary}
        circleBorderInactiveColor={COLORS.border}
        backgroundActive={COLORS.primary}
        backgroundInactive={COLORS.border}
        circleActiveColor={COLORS.cardBackground}
        circleInActiveColor={COLORS.cardBackground}
        renderActiveText={false}
        renderInActiveText={false}
        {...props}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontWeight: "500",
    color: COLORS.secondaryText,
    fontSize: 16,
    marginLeft: 8
  },
});

export default Switch;
