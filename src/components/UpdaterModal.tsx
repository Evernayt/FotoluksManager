import { Text, Image, StyleSheet, View } from "react-native";
import { useCallback, useState, useEffect } from "react";
import Modal from "./UI/Modal";
import { AppUpdate } from "react-native-update-in-app";
import { UPDATE_JSON_URL } from "../constants/api";
import Button, { ButtonVariants } from "./UI/Button";
import { IUpdateData } from "../models/IUpdateData";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { appSlice } from "../store/reducers/AppSlice";
import { logo } from "../constants/images";
import { COLORS } from "../constants/theme";
import Progress from "./UI/Progress";

const UpdaterModal = () => {
  const [updateData, setUpdateData] = useState<IUpdateData>();
  const [percent, setPercent] = useState<number>(0);
  const [apkName, setApkName] = useState<string | null>(null);

  const checkUpdate = useAppSelector((state) => state.app.checkUpdate);
  const downloadUpdate = useAppSelector((state) => state.app.downloadUpdate);

  const dispatch = useAppDispatch();

  useEffect(() => {
    updateCheck();
  }, []);

  const updateCheck = useCallback(async () => {
    try {
      const result = await fetch(UPDATE_JSON_URL);
      const data = await result.json();
      const currentVersionCode = await AppUpdate.getVersionCode();

      if (data.versionCode <= currentVersionCode) {
        dispatch(appSlice.actions.setCheckUpdate({}));
      } else {
        dispatch(appSlice.actions.setCheckUpdate({ success: true }));
        setUpdateData(data);
      }
    } catch (_error) {
      dispatch(appSlice.actions.setCheckUpdate({ failure: true }));
    }
  }, []);

  const updateDownload = () => {
    if (updateData) AppUpdate.downloadApp(updateData.url);

    AppUpdate.onDownloadProgress(async (event) => {
      if (event.status === "start") {
        dispatch(appSlice.actions.setDownloadUpdate({ pending: true }));
        setPercent(0);
        setApkName(null);
        return;
      }

      if (event.status === "downloading") {
        setPercent(event.progress);
        return;
      }

      if (event.status === "end") {
        dispatch(appSlice.actions.setDownloadUpdate({ success: true }));
        setPercent(100);
        setApkName(event.apkFileName);

        await AppUpdate.installApp(event.apkFileName);
        return;
      }

      if (event.status === "error") {
        dispatch(appSlice.actions.setDownloadUpdate({ failure: true }));
        setPercent(0);
        setApkName(null);
        return;
      }
    });
  };

  const updateInstall = () => {
    if (apkName) AppUpdate.installApp(apkName);
  };

  const getCheckUpdateMessage = () => {
    if (checkUpdate.success) {
      return `Доступна новая версия: ${updateData?.versionName}`;
    } else if (checkUpdate.failure) {
      return "Ошибка проверки обновлений";
    } else {
      return "";
    }
  };

  const getDownloadUpdateMessage = () => {
    if (downloadUpdate.pending) {
      return "Скачивание обновлений...";
    } else if (downloadUpdate.success) {
      return "Обновление скачано";
    } else if (downloadUpdate.failure) {
      return "Ошибка скачивания обновлений";
    } else {
      return "";
    }
  };

  const renderButton = () => {
    if (
      checkUpdate.success &&
      !downloadUpdate.pending &&
      !downloadUpdate.success &&
      !downloadUpdate.failure
    ) {
      return (
        <Button
          text="Загрузить"
          variant={ButtonVariants.primary}
          onPress={updateDownload}
        />
      );
    } else if (downloadUpdate.success) {
      return (
        <Button
          text="Установить"
          variant={ButtonVariants.primary}
          onPress={updateInstall}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <Modal title="Обновление" isShowing={checkUpdate.success}>
      <View style={styles.container}>
        <View>
          <Image style={styles.logo} source={logo} />
          <Text style={styles.text}>{getCheckUpdateMessage()}</Text>
          <Text style={styles.text}>{getDownloadUpdateMessage()}</Text>
        </View>
        <View style={styles.controls}>
          {downloadUpdate.pending && <Progress percent={percent} />}
          {renderButton()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 24,
  },
  text: {
    color: COLORS.secondaryText,
    fontSize: 16,
    textAlign: "center",
  },
  controls: {
    gap: 12,
    flex: 0.5,
    justifyContent: "flex-end",
  },
});

export default UpdaterModal;
