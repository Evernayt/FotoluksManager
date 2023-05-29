import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { IconBell, IconClearAll } from "../assets/icons";
import { COLORS } from "../constants/theme";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useEffect, useState } from "react";
import { employeeSlice } from "../store/reducers/EmployeeSlice";
import NotificationAPI from "../api/NotificationAPI/NotificationAPI";
import { IFlatListData } from "../models/IFlatListData";
import { INotification } from "../models/api/INotification";
import { getDateDiff } from "../helpers";
import { APPS, NOTIF_LIMIT } from "../constants/app";
import IconButton, { IconButtonVarians } from "./UI/IconButton";
import Loader from "./UI/Loader";
import SwipeableModal from "./UI/SwipeableModal";
import { appSlice } from "../store/reducers/AppSlice";

const NotificationButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const notifications = useAppSelector((state) => state.employee.notifications);
  const page = useAppSelector((state) => state.employee.notificationsPage);
  const pageCount = useAppSelector(
    (state) => state.employee.notificationsPageCount
  );
  const employee = useAppSelector((state) => state.employee.employee);
  const notificationsBadge = useAppSelector(
    (state) => state.app.notificationsBadge
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    if (employee) {
      NotificationAPI.getAll({
        limit: NOTIF_LIMIT,
        page: 1,
        employeeId: employee.id,
      })
        .then((data) => {
          dispatch(employeeSlice.actions.setNotifications(data.rows));
          const count = Math.ceil(data.count / NOTIF_LIMIT);
          dispatch(employeeSlice.actions.setNotificationsPageCount(count));
        })
        .finally(() => {
          setIsLoading(false);
          setIsRefreshing(false);
        });
    }
  };

  const fetchMoreNotifications = () => {
    if (page >= pageCount) return;

    setIsLoadingMore(true);
    const nextPage = page + 1;
    dispatch(employeeSlice.actions.setNotificationsPage(nextPage));

    NotificationAPI.getAll({
      limit: NOTIF_LIMIT,
      page: nextPage,
      employeeId: employee?.id,
    })
      .then((data) => {
        dispatch(
          employeeSlice.actions.setNotifications([
            ...notifications,
            ...data.rows,
          ])
        );
      })
      .finally(() => setIsLoadingMore(false));
  };

  const deleteAllNotifications = () => {
    if (employee) {
      setIsLoading(true);
      NotificationAPI.deleteByEmployeeId(employee.id)
        .then(() => {
          dispatch(employeeSlice.actions.setNotifications([]));
          dispatch(employeeSlice.actions.setNotificationsPage(1));
          dispatch(employeeSlice.actions.setNotificationsPageCount(1));
        })
        .finally(() => setIsLoading(false));
    }
  };

  const openModal = () => {
    setIsShowing(true);
    dispatch(appSlice.actions.setNoificationsBadge(false));
  };

  const closeModal = () => {
    setIsShowing(false);
  };

  const refresh = () => {
    setIsRefreshing(true);
    fetchNotifications();
  };

  const renderLoader = () => {
    return isLoadingMore ? (
      <View style={styles.footerLoader}>
        <Loader />
      </View>
    ) : null;
  };

  const modalLeftTitleSection = () => {
    return (
      <IconButton
        variant={IconButtonVarians.link}
        icon={<IconClearAll color={COLORS.linkIcon} />}
        disabled={!notifications.length}
        onPress={deleteAllNotifications}
      />
    );
  };

  const renderNotification = (data: IFlatListData<INotification>) => {
    const Icon = APPS.find((x) => x.id === data.item.appId)?.Icon || View;

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
      <SwipeableModal
        title="Уведомления"
        isShowing={isShowing}
        hide={closeModal}
        leftTitleSection={modalLeftTitleSection()}
        titleStyle={styles.modalTitle}
      >
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
                ListFooterComponent={renderLoader}
                onEndReached={fetchMoreNotifications}
                onEndReachedThreshold={0}
                refreshControl={
                  <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={refresh}
                  />
                }
              />
            ) : (
              <Text style={styles.message}>Нет уведомлений</Text>
            )}
          </>
        )}
      </SwipeableModal>
      <TouchableOpacity style={styles.btn} onPress={openModal}>
        {notificationsBadge && <View style={styles.badge} />}
        <IconBell color={COLORS.linkIcon} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  modalTitle: {
    marginLeft: 0,
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
  footerLoader: {
    marginVertical: 12,
  },
});

export default NotificationButton;
