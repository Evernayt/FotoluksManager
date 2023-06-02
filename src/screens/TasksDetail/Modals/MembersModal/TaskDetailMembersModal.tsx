import { FC, useEffect, useState } from "react";
import { Button, Loader, Modal, Search } from "../../../../components";
import { IEmployee } from "../../../../models/api/IEmployee";
import { ITaskMember } from "../../../../models/api/ITaskMember";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import EmployeeAPI from "../../../../api/EmployeeAPI/EmployeeAPI";
import uuid from "react-native-uuid";
import { taskSlice } from "../../../../store/reducers/TaskSlice";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "../../../../constants/theme";
import TaskDetailMemberItem from "./TaskDetailMemberItem";

interface TaskDetailMembersModalProps {
  isShowing: boolean;
  hide: () => void;
}

const TaskDetailMembersModal: FC<TaskDetailMembersModalProps> = ({
  isShowing,
  hide,
}) => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [foundEmployees, setFoundEmployees] = useState<IEmployee[]>([]);
  const [foundTaskMembers, setFoundTaskMembers] = useState<ITaskMember[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const task = useAppSelector((state) => state.task.task);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isShowing) {
      fetchEmployees();
    }
  }, [isShowing]);

  useEffect(() => {
    if (isShowing && search !== "") {
      searchHandler(search);
    }
  }, [employees, task.taskMembers]);

  const fetchEmployees = () => {
    EmployeeAPI.getAll({ appId: 4 })
      .then((data) => {
        if (task.taskMembers) {
          setEmployees(employeesMinusMembers(data.rows, task.taskMembers));
        } else {
          setEmployees(data.rows);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const employeesMinusMembers = (
    employees: IEmployee[],
    taskMembers: ITaskMember[]
  ) => {
    return employees.filter((employee) => {
      return !taskMembers.find((taskMember) => {
        return employee.id === taskMember.employee.id;
      });
    });
  };
  const addTaskMember = (employee: IEmployee) => {
    const createdTaskMember: ITaskMember = {
      id: uuid.v4().toString(),
      employee,
    };
    dispatch(taskSlice.actions.addTaskMember(createdTaskMember));
    setEmployees((prevState) =>
      prevState.filter((state) => state.id !== employee.id)
    );

    dispatch(taskSlice.actions.addTaskMemberForCreate(employee.id));
  };

  const deleteTaskMember = (taskMember: ITaskMember) => {
    dispatch(
      taskSlice.actions.deleteTaskMemberByEmployeeId(taskMember.employee.id)
    );
    setEmployees((prevState) => [...prevState, taskMember.employee]);

    dispatch(
      taskSlice.actions.addTaskMemberForDeleteByEmployeeId(
        taskMember.employee.id
      )
    );
  };

  const addAllTaskMembers = () => {
    const createdTaskMembers: ITaskMember[] = [];
    employees.forEach((employee) => {
      createdTaskMembers.push({
        id: uuid.v4().toString(),
        employee,
      });
    });

    const employeeIds: number[] = [];
    employees.forEach((employee) => {
      employeeIds.push(employee.id);
    });
    dispatch(taskSlice.actions.addTaskMembers(createdTaskMembers));
    setEmployees([]);
    dispatch(taskSlice.actions.addTaskMembersForCreate(employeeIds));
  };

  const deleteAllTaskMembers = () => {
    if (!task.taskMembers) return;

    const taskMembers = task.taskMembers;
    const newEmployees: IEmployee[] = [];
    const employeeIds: number[] = [];
    taskMembers.forEach((taskMember) => {
      newEmployees.push(taskMember.employee);
      employeeIds.push(taskMember.employee.id);
    });
    dispatch(taskSlice.actions.deleteTaskMembers());
    setEmployees((prevState) => [...prevState, ...newEmployees]);
    dispatch(
      taskSlice.actions.addTaskMembersForDeleteByEmployeeIds(employeeIds)
    );
  };

  const searchHandler = (value: string) => {
    setSearch(value);

    const lowerCaseValue = value.toLowerCase();
    const filteredEmployees = employees.filter((employee) =>
      employee.name.toLowerCase().includes(lowerCaseValue)
    );
    const filteredTaskMembers = task.taskMembers?.filter((taskMember) =>
      taskMember.employee.name.toLowerCase().includes(lowerCaseValue)
    );

    setFoundEmployees(filteredEmployees);
    setFoundTaskMembers(filteredTaskMembers || []);
  };

  const close = () => {
    hide();
    setSearch("");
    setFoundEmployees([]);
    setFoundTaskMembers([]);
    setIsLoading(true);
  };

  return (
    <Modal title="Участники" isShowing={isShowing} hide={close}>
      <View style={styles.container}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Search
              value={search}
              onChangeText={searchHandler}
              placeholder="Поиск сотрудников"
              showResults={false}
            />
            <View style={styles.employeesContainer}>
              <View style={styles.section}>
                <Text style={styles.title}>Участвуют</Text>
                <FlatList
                  data={search !== "" ? foundTaskMembers : task.taskMembers}
                  keyExtractor={(item) => `${item.id}`}
                  renderItem={({ item }) => (
                    <TaskDetailMemberItem
                      employee={item.employee}
                      isAdded={true}
                      onClick={() => deleteTaskMember(item)}
                    />
                  )}
                  contentContainerStyle={{ gap: 8 }}
                  showsVerticalScrollIndicator={false}
                />
                <Button text="Удалить всех" onPress={deleteAllTaskMembers} />
              </View>
              <View style={styles.separator} />
              <View style={styles.section}>
                <Text style={styles.title}>Не участвуют</Text>
                <FlatList
                  data={search !== "" ? foundEmployees : employees}
                  keyExtractor={(item) => `${item.id}`}
                  renderItem={({ item }) => (
                    <TaskDetailMemberItem
                      employee={item}
                      isAdded={false}
                      onClick={() => addTaskMember(item)}
                    />
                  )}
                  contentContainerStyle={{ gap: 8 }}
                  showsVerticalScrollIndicator={false}
                />
                <Button text="Добавить всех" onPress={addAllTaskMembers} />
              </View>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    height: SIZES.height / 1.5,
  },
  employeesContainer: {
    flexDirection: "row",
    gap: 4,
    flex: 1,
  },
  section: {
    flex: 1,
    gap: 12,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
    color: COLORS.secondaryText,
  },
  separator: {
    borderRightWidth: 1,
    borderRightColor: COLORS.separator,
  },
});

export default TaskDetailMembersModal;
