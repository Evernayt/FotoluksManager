import {
  View,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { COLORS } from "../../constants/theme";
import { FC } from "react";

interface LoaderProps {
  containerStyle?: StyleProp<ViewStyle>;
}

const Loader: FC<LoaderProps> = ({ containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
