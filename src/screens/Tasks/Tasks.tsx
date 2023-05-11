import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useDebounce, useModal } from "../../hooks";
import { taskSlice } from "../../store/reducers/TaskSlice";
import { ITask, ITasksFilter } from "../../models/api/ITask";
import TaskAPI from "../../api/TaskAPI/TaskAPI";
import { showGlobalMessage } from "../../components/GlobalMessage";
import { IFlatListData } from "../../models/IFlatListData";
import Task from "./Task";
import { Loader } from "../../components";
import { COLORS } from "../../constants/theme";
import TasksToolbar from "./TasksToolbar";
import TasksFilterModal from "./Modals/TasksFilterModal";

const limit = 25;

const Tasks = () => {
  const [pageCount, setPageCount] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const tasks = useAppSelector((state) => state.task.tasks);
  const isLoading = useAppSelector((state) => state.task.isLoading);
  const filter = useAppSelector((state) => state.task.filter);
  const search = useAppSelector((state) => state.task.search);
  const forceUpdate = useAppSelector((state) => state.task.forceUpdate);
  const activeShop = useAppSelector((state) => state.app.activeShop);

  const tasksFilterModal = useModal();

  const debouncedSearchTerm = useDebounce(search);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(taskSlice.actions.setDisableFilter(true));
      fetchTasks({ search });
    } else {
      dispatch(taskSlice.actions.setDisableFilter(false));
      reload();
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (filter.isActive) {
      fetchTasks(filter);
    } else if (filter.isPendingDeactivation) {
      dispatch(taskSlice.actions.deactiveFilter());
      fetchTasks({ shopIds: [1, activeShop.id] });
    } else if (forceUpdate) {
      fetchTasks({ shopIds: [1, activeShop.id] });
    }
    dispatch(taskSlice.actions.setForceUpdate(false));
  }, [forceUpdate]);

  const fetchTasks = (filter?: ITasksFilter) => {
    dispatch(taskSlice.actions.setIsLoading(true));
    setPage(1);

    TaskAPI.getAll({ ...filter, limit, page: 1 })
      .then((data) => {
        dispatch(taskSlice.actions.setTasks(data.rows));
        const count = Math.ceil(data.count / limit);
        setPageCount(count);
      })
      .catch((e) =>
        showGlobalMessage(e.response.data ? e.response.data.message : e.message)
      )
      .finally(() => dispatch(taskSlice.actions.setIsLoading(false)));
  };

  const reload = () => {
    if (filter.isActive) {
      fetchTasks(filter);
    } else {
      fetchTasks();
    }
  };

  const renderTask = (data: IFlatListData<ITask>) => {
    return <Task task={data.item} />;
  };

  const renderLoader = () => {
    return isLoadingMore ? (
      <View style={styles.footerLoader}>
        <Loader />
      </View>
    ) : null;
  };

  const fetchMoreTasks = () => {
    if (page === pageCount) return;

    setIsLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);

    TaskAPI.getAll({ ...filter, limit, page: nextPage })
      .then((data) => {
        dispatch(taskSlice.actions.setTasks([...tasks, ...data.rows]));
      })
      .catch((e) =>
        showGlobalMessage(e.response.data ? e.response.data.message : e.message)
      )
      .finally(() => setIsLoadingMore(false));
  };

  return (
    <>
      <TasksFilterModal
        isShowing={tasksFilterModal.isShowing}
        hide={tasksFilterModal.toggle}
      />
      <TasksToolbar
        reload={reload}
        openTasksFilterModal={tasksFilterModal.toggle}
      />
      <View style={styles.container}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {tasks.length === 0 ? (
              <Text style={styles.message}>Ничего не найдено</Text>
            ) : (
              <FlatList
                data={tasks}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderTask}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={renderLoader}
                onEndReached={fetchMoreTasks}
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

export default Tasks;
