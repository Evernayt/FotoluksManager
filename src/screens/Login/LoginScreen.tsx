import { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { COLORS } from "../../constants/theme";
import { logo } from "../../constants/images";
import {
  Button,
  KeyboardAvoidingWrapper,
  SelectButton,
  Textbox,
} from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import AuthAPI from "../../api/AuthAPI/AuthAPI";
import { getApps } from "../../helpers";
import ShopAPI from "../../api/ShopAPI/ShopAPI";
import { useNavigation } from "@react-navigation/native";
import { appSlice } from "../../store/reducers/AppSlice";
import { employeeSlice } from "../../store/reducers/EmployeeSlice";
import { NavigationProps } from "../../../App";
import { showGlobalMessage } from "../../components/GlobalMessage";
import { GlobalMessageVariants } from "../../models/IGlobalMessage";
import { ButtonVarians } from "../../components/UI/Button";
import { IShop } from "../../models/api/IShop";
import {
  getActiveShop,
  getToken,
  setActiveShop,
} from "../../helpers/asyncStorage";
import socketio from "../../socket/socketio";
import jwtDecode from "jwt-decode";
import { IEmployee } from "../../models/api/IEmployee";
import SplashScreen from "react-native-splash-screen";

const LoginScreen = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const shops = useAppSelector((state) => state.app.shops);
  const activeShop = useAppSelector((state) => state.app.activeShop);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    getActiveShop().then((shop) => {
      if (shop) {
        dispatch(appSlice.actions.setActiveShop(shop));
        autoSignIn();
      }
    });

    const controller = new AbortController();
    fetchShops(controller.signal);
    return () => controller.abort();
  }, []);

  const fetchShops = (signal?: AbortSignal) => {
    ShopAPI.getAll({}, signal)
      .then((data) => {
        dispatch(appSlice.actions.setShops(data.rows));
      })
      .catch((e) =>
        showGlobalMessage(e.response.data ? e.response.data.message : e.message)
      );
  };

  const signIn = () => {
    if (activeShop.id === 0) {
      showGlobalMessage("Выберите филиал", GlobalMessageVariants.warning);
      return;
    }

    setIsLoading(true);
    AuthAPI.login({ login, password })
      .then((data) => {
        const apps = getApps(data.apps);
        if (!apps.length) {
          showGlobalMessage("Нет доступных приложений");
          return;
        }

        socketio.connect();

        dispatch(employeeSlice.actions.signIn(data));
        navigation.replace("HOME_ROUTE");
      })
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
          .then((data) => {
            const apps = getApps(data.apps);
            if (!apps.length) {
              showGlobalMessage("Нет доступных приложений");
              return;
            }

            socketio.connect();

            dispatch(employeeSlice.actions.signIn(data));
            navigation.replace("HOME_ROUTE");
          })
          .catch((e) =>
            showGlobalMessage(
              e.response.data ? e.response.data.message : e.message
            )
          )
          .finally(() => SplashScreen.hide());
      }
    });
  };

  const shopChangeHandler = (shop: IShop) => {
    dispatch(appSlice.actions.setActiveShop(shop));
    setActiveShop(shop);
  };

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <SelectButton
          title="Филиалы"
          defaultSelectedItem={activeShop}
          items={shops}
          onChange={shopChangeHandler}
        />
        <Textbox label="Логин" value={login} onChangeText={setLogin} />
        <Textbox
          label="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Button
          containerStyle={styles.authBtn}
          variant={ButtonVarians.primary}
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
    padding: 24,
    gap: 8,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 48,
  },
  authBtn: {
    marginTop: 12,
  },
});

export default LoginScreen;
