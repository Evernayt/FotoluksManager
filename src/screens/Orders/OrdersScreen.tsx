import { StyleSheet, View } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import { Header } from "../../components";
import Orders from "./Orders";
import OrdersSearch from "./OrdersSearch";

const OrdersScreen = () => {
  return (
    <View style={styles.container}>
      <Header searchRender={OrdersSearch} />
      <View style={styles.panel}>
        <Orders />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 12,
  },
  panel: {
    backgroundColor: COLORS.cardBackground,
    flex: 1,
    borderRadius: SIZES.borderRadius,
  },
});

export default OrdersScreen;
