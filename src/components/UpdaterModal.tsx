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
import { useModal } from "../hooks";

const UpdaterModal = () => {
  const [updateData, setUpdateData] = useState<IUpdateData>();
  const [percent, setPercent] = useState<number>(0);
  const [apkName, setApkName] = useState<string | null>(null);

  const checkUpdate = useAppSelector((state) => state.app.checkUpdate);
  const downloadUpdate = useAppSelector((state) => state.app.downloadUpdate);

  const cancelUpdateModal = useModal();

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
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Button text="Не сейчас" onPress={cancelUpdateModal.open} />
          <Button
            text="Загрузить"
            variant={ButtonVariants.primary}
            onPress={updateDownload}
          />
        </View>
      );
    } else if (downloadUpdate.success) {
      return (
        <Button
          text="Установить"
          variant={ButtonVariants.primary}
          containerStyle={styles.button}
          onPress={updateInstall}
        />
      );
    } else {
      return null;
    }
  };

  const cancelUpdate = () => {
    cancelUpdateModal.close();
    dispatch(appSlice.actions.setCheckUpdate({ success: false }));
  };

  const сheckUpdateMessage = getCheckUpdateMessage();
  const downloadUpdateMessage = getDownloadUpdateMessage();

  return (
    <>
      <Modal title="Обновление" isShowing={checkUpdate.success}>
        <Image style={styles.logo} source={logo} />
        {сheckUpdateMessage && (
          <Text style={styles.text}>{сheckUpdateMessage}</Text>
        )}
        {downloadUpdateMessage && (
          <Text style={styles.text}>{downloadUpdateMessage}</Text>
        )}
        <View style={styles.footer}>
          {downloadUpdate.pending && <Progress percent={percent} />}
          {renderButton()}
        </View>
      </Modal>
      <Modal
        title="Отклонить обновление"
        isShowing={cancelUpdateModal.isShowing}
      >
        <Text style={styles.text}>
          {`Вы действительно хотите отклонить обновление?\n\nИспользование старой версии\nможет вызвать непредвиденные ошибки`}
        </Text>
        <View style={styles.controls}>
          <Button text="Да" onPress={cancelUpdate} />
          <Button
            text="Нет"
            variant={ButtonVariants.primary}
            onPress={cancelUpdateModal.close}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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
  footer: {
    gap: 12,
    marginTop: 16,
  },
  button: {
    flex: 0,
  },
  controls: {
    gap: 8,
    flexDirection: "row",
    marginTop: 16,
  },
});

export default UpdaterModal;
