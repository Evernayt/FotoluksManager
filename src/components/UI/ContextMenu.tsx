import { ReactNode } from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { COLORS, SIZES } from "../../constants/theme";

export interface IContextMenuOption<T> {
  text: string;
  onPress: (data: T) => void;
}

interface ContextMenuProps<T> {
  options: IContextMenuOption<T>[];
  data: T;
  children: ReactNode;
}

const ContextMenu = <T extends object>({
  options,
  data,
  children,
}: ContextMenuProps<T>) => {
  const itemPressHandler = (option: IContextMenuOption<T>) => {
    option.onPress(data);
  };

  return (
    <Menu>
      <MenuTrigger
        triggerOnLongPress
        customStyles={{
          TriggerTouchableComponent: TouchableHighlight,
          triggerTouchable: {
            underlayColor: COLORS.secondaryDeemphasized,
            style: { borderRadius: SIZES.borderRadius },
          },
        }}
      >
        {children}
      </MenuTrigger>
      <MenuOptions optionsContainerStyle={styles.options}>
        {options.map((option) => (
          <MenuOption
            style={styles.option}
            customStyles={{
              OptionTouchableComponent: TouchableOpacity,
            }}
            onSelect={() => itemPressHandler(option)}
            key={option.text}
          >
            <Text style={styles.optionText}>{option.text}</Text>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  options: {
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: 6,
    paddingTop: 6,
    paddingBottom: 2,
  },
  option: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.borderRadius,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  optionText: {
    color: COLORS.primaryText,
    fontWeight: "500",
    fontSize: 18,
  },
});

export default ContextMenu;
