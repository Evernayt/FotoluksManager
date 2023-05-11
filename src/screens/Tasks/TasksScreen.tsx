import { View, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import { Header } from "../../components";
import Tasks from "./Tasks";
import TasksSearch from "./TasksSearch";

const TasksScreen = () => {
  return (
    <View style={styles.container}>
      <Header searchRender={TasksSearch} />
      <View style={styles.panel}>
        <Tasks />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 12,
  },
  panel: {
    backgroundColor: COLORS.cardBackground,
    flex: 1,
    borderRadius: SIZES.borderRadius,
  },
});

export default TasksScreen;
