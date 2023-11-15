import { FlatList, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/theme";
import { Loader } from "../../components";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useDebounce, useModal } from "../../hooks";
import { orderSlice } from "../../store/reducers/OrderSlice";
import { IOrder, IOrdersFilter } from "../../models/api/IOrder";
import OrderAPI from "../../api/OrderAPI/OrderAPI";
import { showGlobalMessage } from "../../components/GlobalMessage";
import { IFlatListData } from "../../models/IFlatListData";
import Order from "./Order";
import OrdersToolbar from "./OrdersToolbar";
import OrdersFilterModal from "./Modals/OrdersFilterModal";

const limit = 10;

const Orders = () => {
  const [pageCount, setPageCount] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const orders = useAppSelector((state) => state.order.orders);
  const isLoading = useAppSelector((state) => state.order.isLoading);
  const filter = useAppSelector((state) => state.order.filter);
  const search = useAppSelector((state) => state.order.search);
  const forceUpdate = useAppSelector((state) => state.order.forceUpdate);

  const ordersFilterModal = useModal();

  const debouncedSearchTerm = useDebounce(search);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(orderSlice.actions.setDisableFilter(true));
      fetchOrders({ search });
    } else {
      dispatch(orderSlice.actions.setDisableFilter(false));
      reload();
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (filter.isActive) {
      fetchOrders(filter);
    } else if (filter.isPendingDeactivation) {
      dispatch(orderSlice.actions.deactiveFilter());
      fetchOrders();
    } else if (forceUpdate) {
      fetchOrders();
    }
    dispatch(orderSlice.actions.setForceUpdate(false));
  }, [forceUpdate]);

  const fetchOrders = (filter?: IOrdersFilter) => {
    dispatch(orderSlice.actions.setIsLoading(true));
    setPage(1);

    OrderAPI.getAll({ ...filter, limit, page: 1 })
      .then((data) => {
        dispatch(orderSlice.actions.setOrders(data.rows));
        const count = Math.ceil(data.count / limit);
        setPageCount(count);
      })
      .catch((e) =>
        showGlobalMessage(e.response.data ? e.response.data.message : e.message)
      )
      .finally(() => dispatch(orderSlice.actions.setIsLoading(false)));
  };

  const reload = () => {
    if (filter.isActive) {
      fetchOrders(filter);
    } else {
      fetchOrders();
    }
  };

  const renderOrder = (data: IFlatListData<IOrder>) => {
    return <Order order={data.item} />;
  };

  const renderLoader = () => {
    return isLoadingMore ? (
      <View style={styles.footerLoader}>
        <Loader />
      </View>
    ) : null;
  };

  const fetchMoreOrders = () => {
    if (page === pageCount) return;

    setIsLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);

    OrderAPI.getAll({ ...filter, limit, page: nextPage })
      .then((data) => {
        dispatch(orderSlice.actions.setOrders([...orders, ...data.rows]));
      })
      .catch((e) =>
        showGlobalMessage(e.response.data ? e.response.data.message : e.message)
      )
      .finally(() => setIsLoadingMore(false));
  };

  return (
    <>
      <OrdersFilterModal
        isShowing={ordersFilterModal.isShowing}
        hide={ordersFilterModal.close}
      />
      <OrdersToolbar
        reload={reload}
        openOrdersFilterModal={ordersFilterModal.open}
      />
      <View style={styles.container}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {orders.length === 0 ? (
              <Text style={styles.message}>Ничего не найдено</Text>
            ) : (
              <FlatList
                data={orders}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderOrder}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={renderLoader}
                onEndReached={fetchMoreOrders}
                onEndReachedThreshold={0}
              />
            )}
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    color: COLORS.secondaryText,
  },
  footerLoader: {
    marginVertical: 12,
  },
});

export default Orders;
