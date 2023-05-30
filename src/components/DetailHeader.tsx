import { ReactNode, FC } from "react";
import { Text, View, StyleSheet } from "react-native";
import IconButton, { IconButtonVariants } from "./UI/IconButton";
import { IconClose } from "../assets/icons";
import { COLORS } from "../constants/theme";

interface DetailHeaderProps {
  title: string;
  onClose: () => void;
  rightSection?: ReactNode;
}

const DetailHeader: FC<DetailHeaderProps> = ({
  title,
  onClose,
  rightSection,
}) => {
  return (
    <View style={styles.container}>
      <IconButton
        icon={<IconClose color={COLORS.secondaryDarkIcon} />}
        variant={IconButtonVariants.dark}
        circle
        onPress={onClose}
      />
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <View style={styles.section}>{rightSection}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    color: COLORS.secondaryTextOnBg,
    flex: 1,
    textAlign: "center",
  },
  section: {
    alignItems: "center",
    gap: 4,
  },
});

export default DetailHeader;
