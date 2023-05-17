import { Search } from "../../components";
import { COLORS } from "../../constants/theme";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { orderSlice } from "../../store/reducers/OrderSlice";

const OrdersSearch = () => {
  const search = useAppSelector((state) => state.order.search);

  const dispatch = useAppDispatch();

  const searchHandler = (search: string) => {
    dispatch(orderSlice.actions.setSearch(search));
  };

  return (
    <Search
      inputStyle={{ backgroundColor: COLORS.cardBackground }}
      placeholder="Поиск заказов"
      showResults={false}
      value={search}
      onChangeText={searchHandler}
    />
  );
};

export default OrdersSearch;
