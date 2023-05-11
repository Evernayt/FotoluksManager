import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { IconBell, IconClearAll } from "../assets/icons";
import { COLORS, SIZES } from "../constants/theme";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useEffect, useState } from "react";
import { employeeSlice } from "../store/reducers/EmployeeSlice";
import NotificationAPI from "../api/NotificationAPI/NotificationAPI";
import Modal from "react-native-modal";
import { IFlatListData } from "../models/IFlatListData";
import { INotification } from "../models/api/INotification";
import { getDateDiff } from "../helpers";
import { APPS } from "../constants/app";
import IconButton, { IconButtonVarians } from "./UI/IconButton";
import Loader from "./UI/Loader";

const NotificationButton = () => {
  const [pageCount, setPageCount] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const notifications = useAppSelector((state) => state.employee.notifications);
  const employee = useAppSelector((state) => state.employee.employee);
  const notificationsBadge = useAppSelector(
    (state) => state.app.notificationsBadge
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(employeeSlice.actions.clearNotifications());
    fetchNotifications(page);
  }, []);

  // useEffect(() => {
  //   if (isLoading || !isVisible) return;

  //   setIsLoading(true);
  //   setPage((prevState) => prevState + 1);
  //   fetchNotifications(page + 1);
  // }, [isVisible]);

  const fetchNotifications = (page: number) => {
    if (employee) {
      const limit = 25;

      NotificationAPI.getAll({
        limit,
        page,
        employeeId: employee.id,
      })
        .then((data) => {
          dispatch(employeeSlice.actions.addNotifications(data.rows));
          const count = Math.ceil(data.count / limit);
          setPageCount(count);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const deleteAllNotifications = () => {
    if (employee) {
      setIsLoading(true);
      NotificationAPI.deleteByEmployeeId(employee.id)
        .then(() => {
          dispatch(employeeSlice.actions.clearNotifications());
          setPage(1);
          setPageCount(1);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const openModal = () => {
    setIsShowing(true);
  };

  const closeModal = () => {
    setIsShowing(false);
  };

  const renderNotification = (data: IFlatListData<INotification>) => {
    const Icon =
      APPS.find((x) => x.value === data.item.app?.value)?.Icon || View;

    return (
      <TouchableHighlight>
        <View style={styles.noficationConatiner}>
          <Icon color={COLORS.linkIcon} />
          <View style={styles.separator} />
          <View style={styles.notification}>
            <View style={styles.notificationTitleContainer}>
              <Text style={styles.notificationTitle}>{data.item.title}</Text>
              <Text style={styles.notificationDate}>
                {getDateDiff(data.item.createdAt)}
              </Text>
            </View>
            <Text style={styles.notificationText}>{data.item.text}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <>
      <Modal
        isVisible={isShowing}
        style={{ margin: 0 }}
        onSwipeComplete={closeModal}
        swipeDirection={"down"}
        useNativeDriver={false}
        propagateSwipe={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.panel}>
            <View style={styles.titleContainer}>
              <View style={styles.swipeLine} />
              <Text style={styles.title}>Уведомления</Text>
              {notifications.length > 0 && (
                <IconButton
                  containerStyle={styles.clearBtn}
                  variant={IconButtonVarians.link}
                  icon={<IconClearAll color={COLORS.linkIcon} />}
                  onPress={deleteAllNotifications}
                />
              )}
            </View>
            {isLoading ? (
              <Loader containerStyle={styles.loader} />
            ) : (
              <>
                {notifications.length ? (
                  <FlatList
                    data={notifications}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderNotification}
                    showsVerticalScrollIndicator={false}
                  />
                ) : (
                  <Text style={styles.message}>Нет уведомлений</Text>
                )}
              </>
            )}
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.btn} onPress={openModal}>
        {notificationsBadge && <View style={styles.badge} />}
        <IconBell color={COLORS.linkIcon} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  panel: {
    maxHeight: "80%",
    backgroundColor: COLORS.cardBackground,
    borderTopLeftRadius: SIZES.borderRadius,
    borderTopRightRadius: SIZES.borderRadius,
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  swipeLine: {
    height: 6,
    width: 50,
    borderRadius: 3,
    backgroundColor: COLORS.border,
    position: "absolute",
    top: -12,
  },
  titleContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    marginVertical: 24,
    color: COLORS.primaryText,
    fontWeight: "500",
  },
  clearBtn: {
    position: "absolute",
    right: 0,
  },
  loader: {
    paddingVertical: 36,
  },
  message: {
    textAlign: "center",
    color: COLORS.secondaryText,
    paddingVertical: 24,
  },
  btn: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLORS.danger,
    position: "absolute",
    right: 8,
    top: 6,
    zIndex: 1,
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  noficationConatiner: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  separator: {
    borderRightWidth: 1,
    borderRightColor: COLORS.text,
  },
  notification: {
    flex: 1,
  },
  notificationTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  notificationTitle: {
    fontWeight: "500",
    fontSize: 15,
    color: COLORS.primaryText,
  },
  notificationDate: {
    color: COLORS.secondaryText,
  },
  notificationText: {
    color: COLORS.primaryText,
  },
});

export default NotificationButton;
