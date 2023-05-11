import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { defaultAvatar } from "../constants/images";
import { FC, ReactNode } from "react";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../App";
import { useAppSelector } from "../hooks/redux";
import NotificationButton from "./NotificationButton";

interface HeaderProps {
  searchRender?: () => ReactNode;
}

const Header: FC<HeaderProps> = ({ searchRender = () => null }) => {
  const employee = useAppSelector((state) => state.employee.employee);

  const navigation = useNavigation<NavigationProps>();

  const openProfile = () => {
    navigation.navigate("PROFILE_ROUTE");
  };

  return (
    <View style={styles.container}>
      {searchRender()}
      <NotificationButton />
      <TouchableOpacity onPress={openProfile}>
        <Image
          style={styles.avatar}
          source={employee?.avatar ? { uri: employee.avatar } : defaultAvatar}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    gap: 8,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  notificationIcon: {
    width: 40,
    height: 40,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    resizeMode: "cover",
  },
});

export default Header;
