import {
  TextInput,
  TextInputProps,
  StyleSheet,
  Animated,
  View,
} from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import { FC, useEffect, useRef, useState } from "react";

interface TextboxProps extends TextInputProps {
  label: string;
  labelBgColor?: string;
}

const Textbox: FC<TextboxProps> = ({
  label,
  labelBgColor = COLORS.background,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const focusValue = useRef(
    new Animated.Value(props.value === "" ? 0 : 1)
  ).current;
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    Animated.timing(focusValue, {
      toValue: isFocused || props.value !== "" ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const focuseHandler = () => {
    setIsFocused(true);
  };

  const blurHandler = () => {
    setIsFocused(false);
  };

  const labelStyle = {
    top: focusValue.interpolate({
      inputRange: [0, 1],
      outputRange: [13, -8],
    }),
    left: focusValue.interpolate({
      inputRange: [0, 1],
      outputRange: [8, 16],
    }),
    fontSize: focusValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 14],
    }),
    backgroundColor: labelBgColor,
  };

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.label, labelStyle]}
        onPress={() => inputRef.current?.focus()}
      >
        {label}
      </Animated.Text>
      <TextInput
        style={[styles.input, props.style]}
        {...props}
        placeholder=""
        onFocus={focuseHandler}
        onBlur={blurHandler}
        ref={inputRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
  label: {
    position: "absolute",
    paddingHorizontal: 8,
    zIndex: 1,
    color: COLORS.secondaryText,
  },
  input: {
    borderColor: COLORS.border,
    borderWidth: 1,
    height: 48,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.primaryText,
  },
});

export default Textbox;
