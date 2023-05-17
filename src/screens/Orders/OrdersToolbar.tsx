import { View, StyleSheet } from "react-native";
import { IconButton } from "../../components";
import { COLORS } from "../../constants/theme";
import { IconAdjustments, IconRefresh } from "../../assets/icons";
import { IconButtonVarians } from "../../components/UI/IconButton";
import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";

interface OrdersToolbarProps {
  reload: () => void;
  openOrdersFilterModal: () => void;
}

const OrdersToolbar: FC<OrdersToolbarProps> = ({
  reload,
  openOrdersFilterModal,
}) => {
  const filter = useAppSelector((state) => state.order.filter);
  const disableFilter = useAppSelector((state) => state.order.disableFilter);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <IconButton
          icon={<IconRefresh color={COLORS.linkIcon} />}
          variant={IconButtonVarians.link}
          onPress={reload}
        />
      </View>
      <IconButton
        icon={<IconAdjustments color={COLORS.linkIcon} />}
        variant={
          filter.isActive
            ? IconButtonVarians.primaryDeemphasized
            : IconButtonVarians.link
        }
        onPress={openOrdersFilterModal}
        disabled={disableFilter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: COLORS.separator,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    flexDirection: "row",
    gap: 8,
  },
});

export default OrdersToolbar;
