import Hyperlink from "react-native-hyperlink";
import { Text, Linking, StyleSheet } from "react-native";
import { ReactNode, FC } from "react";
import { COLORS } from "../../constants/theme";

interface LinkifyProps {
  children: ReactNode;
}

const Linkify: FC<LinkifyProps> = ({ children }) => {
  return (
    <Hyperlink linkStyle={styles.link} onPress={(url) => Linking.openURL(url)}>
      <Text style={styles.text}>{children}</Text>
    </Hyperlink>
  );
};

const styles = StyleSheet.create({
  link: {
    color: COLORS.success,
    textDecorationLine: "underline",
  },
  text: {
    color: COLORS.primaryText,
  },
});

export default Linkify;
