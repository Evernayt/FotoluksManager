import { FC } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { IconCalendarDue, IconStore, IconSum } from "../../assets/icons";
import { COLORS } from "../../constants/theme";
import moment from "moment";
import { DEF_DATE_FORMAT } from "../../constants/app";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../../App";
import { IOrder } from "../../models/api/IOrder";
import { IOrderProduct } from "../../models/api/IOrderProduct";

interface OrderProps {
  order: IOrder;
}

const createServicesName = (orderProducts: IOrderProduct[]) => {
  const orderProductsWithoutDupl = orderProducts?.filter(
    (orderProduct, index, self) =>
      self.findIndex((t) => {
        return t.product?.id === orderProduct.product?.id;
      }) === index
  );
  const services = orderProductsWithoutDupl
    ?.map((orderProduct) => orderProduct.product?.name)
    .join(", ");
  return services ? services : "Нет услуг";
};

const Order: FC<OrderProps> = ({ order }) => {
  const created = moment(order.createdAt).format(DEF_DATE_FORMAT);

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={2}>{`${
          order.id
        }. ${createServicesName(order.orderProducts || [])}`}</Text>
        <Text style={[styles.status, { backgroundColor: order.status?.color }]}>
          {order.status?.name}
        </Text>
      </View>
      <View style={styles.info}>
        <View style={styles.item}>
          <IconCalendarDue
            strokeWidth={1.25}
            width={20}
            height={20}
            color={COLORS.secondaryText}
          />
          <Text style={styles.itemText}>{created}</Text>
        </View>
        <View style={styles.item}>
          <IconStore
            strokeWidth={1.25}
            width={20}
            height={20}
            color={COLORS.secondaryText}
          />
          <Text style={styles.itemText}>{order.shop?.abbreviation}</Text>
        </View>
        <View style={styles.item}>
          <IconSum
            strokeWidth={1.25}
            width={20}
            height={20}
            color={COLORS.secondaryText}
          />
          <Text style={styles.itemText}>{order.sum}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    padding: 12,
    gap: 4,
    minWidth: "100%",
  },
  titleContainer: {
    flexDirection: "row",
  },
  title: {
    fontWeight: "500",
    color: COLORS.primaryText,
    fontSize: 15,
    flex: 1,
  },
  status: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    color: "white",
    alignSelf: "flex-start",
    marginLeft: 4,
  },
  info: {
    flexDirection: "row",
    columnGap: 8,
    rowGap: 4,
    flexWrap: "wrap",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  itemText: {
    color: COLORS.secondaryText,
  },
});

export default Order;
