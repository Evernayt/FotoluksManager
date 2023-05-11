import { Search } from "../../components";
import { COLORS } from "../../constants/theme";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { taskSlice } from "../../store/reducers/TaskSlice";

const TasksSearch = () => {
  const search = useAppSelector((state) => state.task.search);

  const dispatch = useAppDispatch();

  const searchHandler = (search: string) => {
    dispatch(taskSlice.actions.setSearch(search));
  };

  return (
    <Search
      inputStyle={{ backgroundColor: COLORS.cardBackground }}
      placeholder="Поиск задач"
      showResults={false}
      value={search}
      onChangeText={searchHandler}
    />
  );
};

export default TasksSearch;
