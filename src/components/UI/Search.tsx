import {
  View,
  StyleSheet,
  TextInput,
  TextInputProps,
  ScrollView,
  StyleProp,
  ViewStyle,
  Text,
} from "react-native";
import { IconSearch } from "../../assets/icons";
import { FC, ReactNode, useEffect, useState } from "react";
import { COLORS, SIZES } from "../../constants/theme";

interface SearchProps extends TextInputProps {
  value: string;
  children?: ReactNode;
  resultMaxHeight?: number;
  showResults?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
}

const Search: FC<SearchProps> = ({
  value,
  children,
  resultMaxHeight = 300,
  showResults = true,
  containerStyle,
  inputStyle,
  ...props
}) => {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  useEffect(() => {
    if (!showResults) return;

    if (value.length > 0) {
      setIsShowing(true);
    } else {
      setIsShowing(false);
    }
  }, [value]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputContainer}>
        <IconSearch
          style={styles.icon}
          width={20}
          height={20}
          color={COLORS.linkIcon}
        />
        <TextInput
          placeholder="Поиск"
          {...props}
          style={[styles.input, inputStyle]}
        />
      </View>
      {showResults && isShowing && (
        <ScrollView
          style={[styles.resultContainer, { maxHeight: resultMaxHeight }]}
        >
          {children}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
    flex: 1,
    maxHeight: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    left: 12,
    zIndex: 1,
  },
  input: {
    height: 40,
    width: "100%",
    borderRadius: 20,
    backgroundColor: COLORS.background,
    paddingLeft: 40,
    paddingRight: 12,
    color: COLORS.secondaryText,
  },
  resultContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    position: "absolute",
    top: 50,
    borderRadius: SIZES.borderRadius,
    width: "100%",
    padding: 8,
    backgroundColor: COLORS.cardBackground,
  },
});

export default Search;
