import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import Modal from "react-native-modal";
import { FC, useEffect, useState } from "react";
import { IconChevronDown } from "../../assets/icons";
import { IFlatListData } from "../../models/IFlatListData";

export interface ISelectItem {
  id: number;
  name: string;
}

interface SelectButtonProps {
  title: string;
  items: ISelectItem[];
  defaultSelectedItem?: ISelectItem;
  disabled?: boolean;
  onChange: (item: any, index: number) => void;
}

const defaultItem: ISelectItem = {
  id: -1,
  name: "Выберите...",
};

const SelectButton: FC<SelectButtonProps> = ({
  title,
  items,
  defaultSelectedItem,
  disabled,
  onChange,
}) => {
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ISelectItem>(defaultItem);

  useEffect(() => {
    if (defaultSelectedItem) {
      setSelectedItem(defaultSelectedItem);
    }
  }, [defaultSelectedItem]);

  const selectItem = (item: ISelectItem, index: number) => {
    setSelectedItem(item);
    onChange(item, index);
    closeModal();
  };

  const openModal = () => {
    setIsShowing(true);
  };

  const closeModal = () => {
    setIsShowing(false);
  };

  const renderItems = () => {
    return (
      <Modal
        isVisible={isShowing}
        style={{ margin: 0 }}
        onSwipeComplete={closeModal}
        swipeDirection={"down"}
        useNativeDriver={true}
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
              contentContainerStyle={{ gap: 4 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const renderItem = (data: IFlatListData<ISelectItem>) => {
    return (
      <TouchableOpacity
        style={[
          styles.item,
          data.item.id === selectedItem.id && styles.selectedItem,
        ]}
        onPress={() => selectItem(data.item, data.index)}
      >
        <Text style={styles.text}>{data.item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {renderItems()}
      <TouchableOpacity
        style={styles.container}
        disabled={disabled}
        onPress={openModal}
      >
        <Text style={styles.text}>{selectedItem.name}</Text>
        <IconChevronDown style={styles.iconDown} color={COLORS.secondaryIcon} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: SIZES.borderRadius,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    backgroundColor: COLORS.secondary,
    flexDirection: "row",
  },
  text: {
    fontSize: 18,
    color: COLORS.primaryText,
    fontWeight: "500",
  },
  iconDown: {
    position: "absolute",
    right: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  panel: {
    maxHeight: "60%",
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
  },
  title: {
    fontSize: 18,
    marginVertical: 24,
    color: COLORS.primaryText,
    fontWeight: "500",
  },
  item: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.borderRadius,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  selectedItem: {
    backgroundColor: COLORS.primaryDeemphasized,
  },
});

export default SelectButton;
