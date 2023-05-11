import { FC, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { defaultAvatar } from "../../constants/images";
import { COLORS, SIZES } from "../../constants/theme";
import Modal from "react-native-modal";
import { IFlatListData } from "../../models/IFlatListData";

export interface IAvatarListItem {
  id: number;
  name: string;
  avatar?: string;
}

interface AvatarListProps {
  items: IAvatarListItem[];
  title: string;
  avatarBorderColor?: string;
}

const AvatarList: FC<AvatarListProps> = ({
  items,
  title,
  avatarBorderColor = COLORS.cardBackground,
}) => {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const openModal = () => {
    setIsShowing(true);
  };

  const closeModal = () => {
    setIsShowing(false);
  };

  const renderItem = (data: IFlatListData<IAvatarListItem>) => {
    return (
      <View style={styles.item}>
        <Image
          style={styles.itemImage}
          source={data.item.avatar ? { uri: data.item.avatar } : defaultAvatar}
        />
        <Text style={styles.text}>{data.item.name}</Text>
      </View>
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
              <Text style={styles.title}>{title}</Text>
            </View>
            <FlatList
              data={items}
              keyExtractor={(item) => `${item.id}`}
              renderItem={renderItem}
              contentContainerStyle={{ gap: 12 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.container} onPress={openModal}>
        {items.map((item) => (
          <Image
            style={[styles.image, { borderColor: avatarBorderColor }]}
            source={item.avatar ? { uri: item.avatar } : defaultAvatar}
            key={item.id}
          />
        ))}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 8,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: -8,
    borderWidth: 3,
    resizeMode: "cover",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  panel: {
    maxHeight: "60%",
    backgroundColor: COLORS.background,
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
  },
  title: {
    fontSize: 18,
    marginVertical: 24,
    color: COLORS.primaryText,
    fontWeight: "500",
  },
  text: {
    fontSize: 18,
    color: COLORS.primaryText,
    fontWeight: "500",
  },
  item: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: 'center',
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16
  },
});

export default AvatarList;
