import { FC, ReactNode } from "react";
import { View, StyleSheet, Text, StyleProp, ViewStyle } from "react-native";
import Modal from "react-native-modal";
import { COLORS, SIZES } from "../../constants/theme";
import IconButton, { IconButtonVarians } from "./IconButton";
import { IconClose } from "../../assets/icons";

interface SwipeableModalProps {
  hide: () => void;
  children: ReactNode;
  title?: string;
  isShowing?: boolean;
  panelStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<ViewStyle>;
  leftTitleSection?: ReactNode;
  useNativeDriver?: boolean;
}

const SwipeableModal: FC<SwipeableModalProps> = ({
  hide,
  children,
  title,
  isShowing,
  panelStyle,
  titleStyle,
  leftTitleSection,
  useNativeDriver = true,
}) => {
  return (
    <Modal
      isVisible={isShowing}
      style={{ margin: 0 }}
      onSwipeComplete={hide}
      swipeDirection={"down"}
      useNativeDriver={useNativeDriver}
      propagateSwipe={true}
    >
      <View style={styles.container}>
        <View style={[styles.panel, panelStyle]}>
          <View style={styles.titleContainer}>
            <View style={styles.swipeLine} />
            {leftTitleSection}
            <Text style={[styles.title, titleStyle]}>{title}</Text>
            <IconButton
              variant={IconButtonVarians.link}
              containerStyle={styles.closeBtn}
              icon={<IconClose color={COLORS.linkIcon} onPress={hide} />}
            />
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  panel: {
    maxHeight: "60%",
    backgroundColor: COLORS.cardBackground,
    borderTopLeftRadius: SIZES.borderRadius,
    borderTopRightRadius: SIZES.borderRadius,
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  swipeLine: {
    height: 6,
    width: 50,
    borderRadius: 3,
    backgroundColor: COLORS.border,
    position: "absolute",
    top: -12,
  },
  title: {
    color: COLORS.primaryText,
    fontWeight: "500",
    textAlign: "center",
    fontSize: 18,
    flex: 1,
    marginLeft: 40,
  },
  closeBtn: {
    marginLeft: "auto",
    marginRight: 0,
  },
  childrenContainer: {
    padding: 8,
    flex: 1,
  },
});

export default SwipeableModal;
