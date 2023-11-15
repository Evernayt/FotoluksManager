import { StyleSheet, TextInput, View, TextInputProps } from "react-native";
import IconButton from "./IconButton";
import { IconSend } from "../../assets/icons";
import { COLORS } from "../../constants/theme";
import { FC, useState } from "react";

interface MessageTextboxProps extends TextInputProps {
  icon?: JSX.Element;
  onButtonPress: () => void;
}

const MessageTextbox: FC<MessageTextboxProps> = ({
  icon,
  onButtonPress,
  ...props
}) => {
  const [inputHeight, setInputHeight] = useState<number>(0);

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.messageInput, { maxHeight: Math.max(25, inputHeight) }]}
        placeholder="Введите комментарий"
        placeholderTextColor={COLORS.secondaryText}
        {...props}
        multiline={true}
        onContentSizeChange={(event) =>
          setInputHeight(event.nativeEvent.contentSize.height)
        }
      />
      <IconButton
        containerStyle={styles.btn}
        icon={
          icon ? (
            icon
          ) : (
            <IconSend style={styles.sendIcon} color={COLORS.linkIcon} />
          )
        }
        onPress={() => onButtonPress()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "flex-end",
  },
  messageInput: {
    backgroundColor: COLORS.background,
    maxHeight: 100,
    borderRadius: 20,
    paddingHorizontal: 24,
    fontSize: 16,
    color: COLORS.primaryText,
    flex: 1,
    marginRight: 8,
    textAlignVertical: "top",
  },
  btn: {
    height: 42,
    width: 42,
    borderRadius: 21,
  },
  sendIcon: {
    transform: [{ rotate: "45deg" }],
    marginLeft: -4,
  },
});

export default MessageTextbox;
