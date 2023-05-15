import { View, StyleSheet, Text } from "react-native";
import { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../App";
import IconButton from "./UI/IconButton";
import { IconArrowLeft } from "../assets/icons";
import { COLORS } from "../constants/theme";

interface NavHeaderProps {
  title: string;
}

const NavHeader: FC<NavHeaderProps> = ({ title }) => {
  const navigation = useNavigation<NavigationProps>();

  const back = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <IconButton
        icon={<IconArrowLeft color={COLORS.secondaryIcon} />}
        circle
        onPress={back}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    gap: 8,
    alignItems: "center",
  },
  title: {
    color: COLORS.secondaryTextOnBg,
    fontSize: 16,
    flex: 1,
    textAlign: "center",
    marginRight: 48,
    fontWeight: "500",
  },
});

export default NavHeader;
