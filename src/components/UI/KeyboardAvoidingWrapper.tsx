import { FC, ReactNode } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

interface KeyboardAvoidingWrapperProps {
  children: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

const KeyboardAvoidingWrapper: FC<KeyboardAvoidingWrapperProps> = ({
  children,
  containerStyle,
}) => {
  return (
    <KeyboardAvoidingView style={[styles.container, containerStyle]}>
      <ScrollView keyboardShouldPersistTaps="always">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 12,
  },
});

export default KeyboardAvoidingWrapper;
