import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { FC } from "react";
import { COLORS } from "../../constants/theme";

interface ProgressProps {
  percent: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const Progress: FC<ProgressProps> = ({ percent, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.progress,
          { width: percent >= 100 ? "100%" : `${percent}%` },
        ]}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.secondary,
    position: "relative",
  },
  progress: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
});

export default Progress;
