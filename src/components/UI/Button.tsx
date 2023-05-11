import { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

export enum ButtonVarians {
  primary = "primary",
  primaryDeemphasized = "primaryDeemphasized",
  secondary = "secondary",
}

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  variant?: ButtonVarians;
  containerStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  loadingText?: string;
}

const Button: FC<ButtonProps> = ({
  text,
  variant = ButtonVarians.secondary,
  containerStyle,
  isLoading,
  loadingText = "Загрузка...",
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.container,
        styles[variant],
        containerStyle,
        (isLoading || props.disabled) && {
          backgroundColor: COLORS.disabledBackground,
        },
      ]}
      disabled={isLoading || props.disabled}
    >
      <Text style={styles.text}>{isLoading ? loadingText : text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    maxHeight: 48,
    borderRadius: SIZES.borderRadius,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: COLORS.primaryText,
    fontWeight: "500",
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  primaryDeemphasized: {
    backgroundColor: COLORS.primaryDeemphasized,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
});

export default Button;
