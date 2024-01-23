import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image, TextInput } from "react-native";
import { COLORS } from "../../constants/theme";
import { logo } from "../../constants/images";
import { Button, KeyboardAvoidingWrapper, Textbox } from "../../components";
import { useAppDispatch } from "../../hooks/redux";
import AuthAPI from "../../api/AuthAPI/AuthAPI";
import { getApps } from "../../helpers";
import { useNavigation } from "@react-navigation/native";
import { employeeSlice } from "../../store/reducers/EmployeeSlice";
import { NavigationProps } from "../../../App";
import { showGlobalMessage } from "../../components/GlobalMessage";
import { ButtonVariants } from "../../components/UI/Button";
import {
  getPushNotifications,
  getToken,
  setEmployee,
} from "../../helpers/asyncStorage";
import jwtDecode from "jwt-decode";
import { IEmployee } from "../../models/api/IEmployee";
import SplashScreen from "react-native-splash-screen";
import { appSlice } from "../../store/reducers/AppSlice";
import { notificationListener, subscribeTopic } from "../../firebase/messaging";
import socketio from "../../socket/socketio";

const LoginScreen = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const passwordTextboxRef = useRef<TextInput>(null);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    getPushNotifications().then((pushNotifications) => {
      if (pushNotifications) {
        dispatch(appSlice.actions.setPushNotifications(pushNotifications));
      }
    });

    autoSignIn();
  }, []);

  const signIn = () => {
    setIsLoading(true);
    AuthAPI.login({ login, password })
      .then((data) => loggedIn(data))
      .catch((e) => {
        showGlobalMessage(
          e.response.data ? e.response.data.message : e.message
        );
      })
      .finally(() => setIsLoading(false));
  };

  const autoSignIn = () => {
    getToken().then((token) => {
      if (token === "") {
        SplashScreen.hide();
      } else {
        const lastEmployee: IEmployee = jwtDecode(token);
        AuthAPI.checkAuth(lastEmployee.login)
          .then((data) => loggedIn(data))
          .catch((e) =>
            showGlobalMessage(
              e.response.data ? e.response.data.message : e.message
            )
          )
          .finally(() => SplashScreen.hide());
      }
    });
  };

  const loggedIn = (employee: IEmployee) => {
    const apps = getApps(employee.apps);
    if (!apps.length) {
      showGlobalMessage("Нет доступных приложений");
      return;
    }
    setEmployee(employee);

    socketio.connect(employee.id);

    subscribeTopic("fotoluks-manager");
    notificationListener(employee);

    dispatch(employeeSlice.actions.signIn(employee));
    navigation.replace("HOME_ROUTE");
  };

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <Textbox
          label="Логин"
          autoCapitalize="none"
          value={login}
          onChangeText={setLogin}
          returnKeyType="next"
          onSubmitEditing={() => passwordTextboxRef.current?.focus()}
          blurOnSubmit={false}
        />
        <Textbox
          label="Пароль"
          autoCapitalize="none"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          returnKeyType="done"
          onSubmitEditing={signIn}
          ref={passwordTextboxRef}
        />
        <Button
          containerStyle={styles.authBtn}
          variant={ButtonVariants.primary}
          disabled={login === "" || password === ""}
          isLoading={isLoading}
          loadingText="Авторизация..."
          text="Войти"
          onPress={signIn}
        />
      </View>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    paddingVertical: 48,
    gap: 8,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 24,
  },
  authBtn: {
    marginTop: 12,
  },
});

export default LoginScreen;
