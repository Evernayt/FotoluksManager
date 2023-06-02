import { FC, ReactNode } from "react";
import RNModal from "react-native-modal";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import IconButton from "./IconButton";
import { IconClose } from "../../assets/icons";
import { COLORS, SIZES } from "../../constants/theme";

interface ModalProps {
  children: ReactNode;
  hide?: () => void;
  title?: string;
  isShowing?: boolean;
  panelStyle?: StyleProp<ViewStyle>;
}

const Modal: FC<ModalProps> = ({
  children,
  hide,
  title,
  isShowing,
  panelStyle,
}) => {
  return (
    <RNModal
      isVisible={isShowing}
      style={styles.container}
      animationIn="fadeInUpBig"
      useNativeDriver={true}
      onBackdropPress={hide}
    >
      <View style={[styles.panel, panelStyle]}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { marginLeft: hide ? 40 : 0 }]}>
            {title}
          </Text>
          {hide && (
            <IconButton
              containerStyle={styles.closeBtn}
              circle
              icon={<IconClose color={COLORS.secondaryIcon} onPress={hide} />}
            />
          )}
        </View>
        <View style={styles.childrenContainer}>{children}</View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    justifyContent: "flex-end",
    padding: 12,
  },
  panel: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.borderRadius,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.separator,
    padding: 8,
  },
  title: {
    color: COLORS.primaryText,
    fontWeight: "500",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18,
    flex: 1,
    height: 40,
  },
  closeBtn: {
    marginLeft: "auto",
    marginRight: 0,
  },
  childrenContainer: {
    padding: 8,
  },
});

export default Modal;
