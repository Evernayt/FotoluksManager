import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import { FC, useEffect, useState } from "react";
import { IconChevronDown } from "../../assets/icons";
import { IFlatListData } from "../../models/IFlatListData";
import SwipeableModal from "./SwipeableModal";

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
      <SwipeableModal title={title} isShowing={isShowing} hide={closeModal}>
        <FlatList
          data={items}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 4 }}
          showsVerticalScrollIndicator={false}
        />
      </SwipeableModal>
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
