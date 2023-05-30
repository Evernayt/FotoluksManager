import { FC, useEffect, useState } from "react";
import { IShop } from "../../../models/api/IShop";
import { IDepartment } from "../../../models/api/IDepartment";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import ShopAPI from "../../../api/ShopAPI/ShopAPI";
import { ALL_SHOPS } from "../../../constants/states/shop-states";
import DepartmentAPI from "../../../api/DepartmentAPI/DepartmentAPI";
import { ALL_DEPARTMENTS } from "../../../constants/states/department-states";
import { taskSlice } from "../../../store/reducers/TaskSlice";
import { Button, Modal, SelectButton, Switch } from "../../../components";
import { StyleSheet, View } from "react-native";
import { ButtonVariants } from "../../../components/UI/Button";

interface TasksFilterModalProps {
  isShowing: boolean;
  hide: () => void;
}

const statuses = [
  {
    id: 0,
    name: "Все задачи",
    status: 0,
  },
  {
    id: 1,
    name: "Незавершенные",
    status: 1,
  },
  {
    id: 2,
    name: "Завершенные",
    status: 2,
  },
];

const TasksFilterModal: FC<TasksFilterModalProps> = ({ isShowing, hide }) => {
  const [shops, setShops] = useState<IShop[]>([]);
  const [departments, setDepartments] = useState<IDepartment[]>([]);

  const employee = useAppSelector((state) => state.employee.employee);
  const selectedStatus = useAppSelector((state) => state.task.selectedStatus);
  const selectedShop = useAppSelector((state) => state.task.selectedShop);
  const selectedDepartment = useAppSelector(
    (state) => state.task.selectedDepartment
  );
  const iTaskMember = useAppSelector((state) => state.task.iTaskMember);
  const iTaskCreator = useAppSelector((state) => state.task.iTaskCreator);
  const archive = useAppSelector((state) => state.task.archive);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isShowing) {
      fetchShops();
      fetchDepartments();
    }
  }, [isShowing]);

  const fetchShops = () => {
    ShopAPI.getAll({ isIncludeGeneral: true }).then((data) => {
      setShops([ALL_SHOPS, ...data.rows]);
    });
  };

  const fetchDepartments = () => {
    DepartmentAPI.getAll({ isIncludeGeneral: true }).then((data) => {
      setDepartments([ALL_DEPARTMENTS, ...data.rows]);
    });
  };

  const clear = () => {
    dispatch(taskSlice.actions.setForceUpdate(true));
    dispatch(taskSlice.actions.clearFilter());

    reset();
    hide();
  };

  const filter = () => {
    dispatch(taskSlice.actions.setForceUpdate(true));
    dispatch(
      taskSlice.actions.activeFilter({
        shopIds: [selectedShop.id],
        departmentIds: [selectedDepartment.id],
        status: selectedStatus,
        creatorId: iTaskCreator ? employee?.id : undefined,
        employeeId: iTaskMember ? employee?.id : undefined,
        archive,
      })
    );
    hide();
  };

  const reset = () => {
    dispatch(taskSlice.actions.setSelectedStatus(0));
    dispatch(taskSlice.actions.setSelectedShop(ALL_SHOPS));
    dispatch(taskSlice.actions.setSelectedDepartment(ALL_DEPARTMENTS));
    dispatch(taskSlice.actions.setITaskCreator(false));
    dispatch(taskSlice.actions.setITaskMember(false));
    dispatch(taskSlice.actions.setArchive(false));
  };

  return (
    <Modal
      title="Фильтры задач"
      isShowing={isShowing}
      hide={hide}
      panelStyle={styles.modalPanel}
    >
      <View style={styles.container}>
        <SelectButton
          title="Статусы"
          items={statuses}
          defaultSelectedItem={statuses[selectedStatus]}
          onChange={(item) =>
            dispatch(taskSlice.actions.setSelectedStatus(item.status))
          }
        />
        <SelectButton
          title="Филиалы"
          items={shops}
          defaultSelectedItem={selectedShop}
          onChange={(item) => dispatch(taskSlice.actions.setSelectedShop(item))}
        />
        <SelectButton
          title="Отделы"
          items={departments}
          defaultSelectedItem={selectedDepartment}
          onChange={(item) =>
            dispatch(taskSlice.actions.setSelectedDepartment(item))
          }
        />
        <Switch
          label="Я участвую в задаче"
          value={iTaskMember}
          onValueChange={() =>
            dispatch(taskSlice.actions.setITaskMember(!iTaskMember))
          }
        />
        <Switch
          label="Я создатель задачи"
          value={iTaskCreator}
          onValueChange={() =>
            dispatch(taskSlice.actions.setITaskCreator(!iTaskCreator))
          }
        />
        <Switch
          label="В архиве"
          value={archive}
          onValueChange={() => dispatch(taskSlice.actions.setArchive(!archive))}
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
    height: 412
  },
  container: {
    gap: 8,
  },
  controls: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
});

export default TasksFilterModal;
