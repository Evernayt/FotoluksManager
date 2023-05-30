import { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

export enum IconButtonVariants {
  primary = "primary",
  primaryDeemphasized = "primaryDeemphasized",
  secondary = "secondary",
  link = "link",
  dark = "dark",
}

interface IconButtonProps extends TouchableOpacityProps {
  icon: JSX.Element;
  variant?: IconButtonVariants;
  containerStyle?: StyleProp<ViewStyle>;
  circle?: boolean;
}

const IconButton: FC<IconButtonProps> = ({
  icon,
  variant = IconButtonVariants.secondary,
  containerStyle,
  circle,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.container,
        styles[variant],
        circle && styles.circle,
        containerStyle,
        props.disabled && { backgroundColor: COLORS.disabledBackground },
      ]}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    borderRadius: SIZES.borderRadius,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    borderRadius: 20,
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
  link: {
    backgroundColor: "transparent",
  },
  dark: {
    backgroundColor: COLORS.secondaryDark,
  },
});

export default IconButton;
