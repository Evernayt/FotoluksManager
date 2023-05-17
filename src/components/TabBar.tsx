import { View, StyleSheet } from "react-native";
import { FC } from "react";
import { COLORS } from "../constants/theme";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabButton from "./TabButton";

const TabBar: FC<BottomTabBarProps> = ({ state, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;

        const onPress = () => {
          if (!focused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabButton
            focused={focused}
            name={route.name}
            onPress={onPress}
            key={route.key}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: 24,
    paddingVertical: 8,
    gap: 8,
  },
});

export default TabBar;
