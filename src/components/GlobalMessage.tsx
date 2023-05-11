import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { appSlice } from "../store/reducers/AppSlice";
import { GlobalMessageVariants } from "../models/IGlobalMessage";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import store from "../store";
import { COLORS, SIZES } from "../constants/theme";

export const showGlobalMessage = (
  message: string,
  variant = GlobalMessageVariants.danger
) => {
  store.dispatch(
    appSlice.actions.setGlobalMessage({
      message,
      variant,
      isShowing: true,
    })
  );
};

const GlobalMessage = () => {
  const { message, variant, isShowing } = useAppSelector(
    (state) => state.app.globalMessage
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isShowing) {
      setTimeout(close, 3000);
    }
  }, [isShowing]);

  const close = () => {
    dispatch(
      appSlice.actions.setGlobalMessage({
        message: "",
        variant: GlobalMessageVariants.success,
        isShowing: false,
      })
    );
  };

  return isShowing ? (
    <TouchableOpacity
      style={[styles.container, styles[variant]]}
      onPress={close}
    >
      <Text style={styles.text}>{message}</Text>
    </TouchableOpacity>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 99999,
    alignSelf: "center",
    bottom: 72,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: SIZES.borderRadius,
  },
  success: {
    backgroundColor: COLORS.success,
  },
  danger: {
    backgroundColor: COLORS.danger,
  },
  warning: {
    backgroundColor: COLORS.warning,
  },
  text: {
    color: "white",
  },
});

export default GlobalMessage;
