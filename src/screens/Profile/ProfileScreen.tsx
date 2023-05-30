import { Image, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { defaultAvatar } from "../../constants/images";
import { COLORS } from "../../constants/theme";
import { Button, NavHeader } from "../../components";
import { ButtonVariants } from "../../components/UI/Button";
import { employeeSlice } from "../../store/reducers/EmployeeSlice";
import { appSlice } from "../../store/reducers/AppSlice";
import { taskSlice } from "../../store/reducers/TaskSlice";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../../App";
import socketio from "../../socket/socketio";
import { setToken } from "../../helpers/asyncStorage";

const ProfileScreen = () => {
  const employee = useAppSelector((state) => state.employee.employee);

  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();

  const signOut = () => {
    setToken("");

    dispatch(employeeSlice.actions.clearState());
    dispatch(appSlice.actions.clearState());
    dispatch(taskSlice.actions.clearState());

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "LOGIN_ROUTE" }],
      })
    );
    socketio.disconnect();
  };

  return (
    <View style={styles.container}>
      <NavHeader title="Профиль" />
      <View>
        <Image
          style={styles.avatar}
          source={employee?.avatar ? { uri: employee.avatar } : defaultAvatar}
        />
        <Text style={styles.name}>{employee?.name}</Text>
        <Text style={styles.login}>{employee?.login}</Text>
      </View>
      <Button
        text="Выйти из аккаунта"
        variant={ButtonVariants.primary}
        onPress={signOut}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  avatar: {
    width: 144,
    height: 144,
    borderRadius: 72,
  },
  name: {
    fontWeight: "500",
    fontSize: 16,
    color: COLORS.primaryText,
    marginTop: 24,
    marginBottom: 4,
    textAlign: "center",
  },
  login: {
    color: COLORS.secondaryTextOnBg,
    textAlign: "center",
  },
});

export default ProfileScreen;
