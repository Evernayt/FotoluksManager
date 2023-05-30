import { FC, useEffect, useState } from "react";
import { IShop } from "../../../models/api/IShop";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import ShopAPI from "../../../api/ShopAPI/ShopAPI";
import { ALL_SHOPS } from "../../../constants/states/shop-states";
import {
  Button,
  DatePicker,
  Modal,
  SelectButton,
  Switch,
} from "../../../components";
import { StyleSheet, View } from "react-native";
import { ButtonVariants } from "../../../components/UI/Button";
import { IStatus } from "../../../models/api/IStatus";
import { orderSlice } from "../../../store/reducers/OrderSlice";
import { ALL_STATUSES } from "../../../constants/states/status-states";
import StatusAPI from "../../../api/StatusAPI/StatusAPI";

interface OrdersFilterModalProps {
  isShowing: boolean;
  hide: () => void;
}

const OrdersFilterModal: FC<OrdersFilterModalProps> = ({ isShowing, hide }) => {
  const [shops, setShops] = useState<IShop[]>([]);
  const [statuses, setStatuses] = useState<IStatus[]>([]);

  const employee = useAppSelector((state) => state.employee.employee);
  const selectedStatus = useAppSelector((state) => state.order.selectedStatus);
  const selectedShop = useAppSelector((state) => state.order.selectedShop);
  const startDate = useAppSelector((state) => state.order.startDate);
  const endDate = useAppSelector((state) => state.order.endDate);
  const iOrderMember = useAppSelector((state) => state.order.iOrderMember);

  const dispatch = useAppDispatch();
  //   () => [
  //     {
  //       id: 1,
  //       name: 'Текущий день',
  //       onClick: () => {
  //         const start = moment().startOf('day').format(INPUT_DATE_FORMAT);
  //         dispatch(orderSlice.actions.setStartDate(start));

  //         const end = moment().endOf('day').format(INPUT_DATE_FORMAT);
  //         dispatch(orderSlice.actions.setEndDate(end));
  //       },
  //     },
  //     {
  //       id: 2,
  //       name: 'Предыдущий день',
  //       onClick: () => {
  //         const start = moment()
  //           .subtract(1, 'day')
  //           .startOf('day')
  //           .format(INPUT_DATE_FORMAT);
  //         dispatch(orderSlice.actions.setStartDate(start));

  //         const end = moment()
  //           .subtract(1, 'day')
  //           .endOf('day')
  //           .format(INPUT_DATE_FORMAT);
  //         dispatch(orderSlice.actions.setEndDate(end));
  //       },
  //     },
  //     {
  //       id: 3,
  //       name: 'Текущая неделя',
  //       onClick: () => {
  //         const start = moment().startOf('week').format(INPUT_DATE_FORMAT);
  //         dispatch(orderSlice.actions.setStartDate(start));

  //         const end = moment().endOf('week').format(INPUT_DATE_FORMAT);
  //         dispatch(orderSlice.actions.setEndDate(end));
  //       },
  //     },
  //     {
  //       id: 4,
  //       name: 'Предыдущая неделя',
  //       onClick: () => {
  //         const start = moment()
  //           .subtract(1, 'week')
  //           .startOf('week')
  //           .format(INPUT_DATE_FORMAT);
  //         dispatch(orderSlice.actions.setStartDate(start));

  //         const end = moment()
  //           .subtract(1, 'week')
  //           .endOf('week')
  //           .format(INPUT_DATE_FORMAT);
  //         dispatch(orderSlice.actions.setEndDate(end));
  //       },
  //     },
  //     {
  //       id: 5,
  //       name: 'Текущий месяц',
  //       onClick: () => {
  //         const start = moment().startOf('month').format(INPUT_DATE_FORMAT);
  //         dispatch(orderSlice.actions.setStartDate(start));

  //         const end = moment().endOf('month').format(INPUT_DATE_FORMAT);
  //         dispatch(orderSlice.actions.setEndDate(end));
  //       },
  //     },
  //     {
  //       id: 6,
  //       name: 'Предыдущий месяц',
  //       onClick: () => {
  //         const start = moment()
  //           .subtract(1, 'month')
  //           .startOf('month')
  //           .format(INPUT_DATE_FORMAT);
  //         dispatch(orderSlice.actions.setStartDate(start));

  //         const end = moment()
  //           .subtract(1, 'month')
  //           .endOf('month')
  //           .format(INPUT_DATE_FORMAT);
  //         dispatch(orderSlice.actions.setEndDate(end));
  //       },
  //     },
  //   ],
  //   []
  // );

  useEffect(() => {
    if (isShowing) {
      fetchStatuses();
      fetchShops();
    }
  }, [isShowing]);

  const fetchStatuses = () => {
    StatusAPI.getAll().then((data) => {
      setStatuses([ALL_STATUSES, ...data.rows]);
    });
  };

  const fetchShops = () => {
    ShopAPI.getAll({ isIncludeGeneral: true }).then((data) => {
      setShops([ALL_SHOPS, ...data.rows]);
    });
  };

  const clear = () => {
    dispatch(orderSlice.actions.setForceUpdate(true));
    dispatch(orderSlice.actions.clearFilter());

    reset();
    hide();
  };

  const filter = () => {
    dispatch(orderSlice.actions.setForceUpdate(true));
    dispatch(
      orderSlice.actions.activeFilter({
        statusId: selectedStatus.id,
        shopIds: [selectedShop.id],
        startDate,
        endDate,
        employeeId: iOrderMember ? employee?.id : undefined,
      })
    );
    hide();
  };

  const reset = () => {
    dispatch(orderSlice.actions.setSelectedStatus(ALL_STATUSES));
    dispatch(orderSlice.actions.setSelectedShop(ALL_SHOPS));
    dispatch(orderSlice.actions.setStartDate(""));
    dispatch(orderSlice.actions.setEndDate(""));
    dispatch(orderSlice.actions.setIOrderMember(false));
  };

  return (
    <Modal
      title="Фильтры заказов"
      isShowing={isShowing}
      hide={hide}
      panelStyle={styles.modalPanel}
    >
      <View style={styles.container}>
        <SelectButton
          title="Статусы"
          items={statuses}
          defaultSelectedItem={selectedStatus}
          onChange={(item) =>
            dispatch(orderSlice.actions.setSelectedStatus(item))
          }
        />
        <SelectButton
          title="Филиалы"
          items={shops}
          defaultSelectedItem={selectedShop}
          onChange={(item) =>
            dispatch(orderSlice.actions.setSelectedShop(item))
          }
        />
        <DatePicker
          label="От"
          date={startDate}
          onChange={(date) => dispatch(orderSlice.actions.setStartDate(date))}
        />
        <DatePicker
          label="До"
          date={endDate}
          onChange={(date) => dispatch(orderSlice.actions.setEndDate(date))}
        />
        <Switch
          label="Я участвую в заказе"
          value={iOrderMember}
          onValueChange={() =>
            dispatch(orderSlice.actions.setIOrderMember(!iOrderMember))
          }
        />
      </View>
      <View style={styles.controls}>
        <Button text="Очистить" onPress={clear} />
        <Button
          text="Готово"
          variant={ButtonVariants.primary}
          onPress={filter}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalPanel: {
    height: 392,
  },
  container: {
    gap: 8,
    flex: 1,
  },
  controls: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
});

export default OrdersFilterModal;
