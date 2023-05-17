import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import { IconCalendarTime } from "../../assets/icons";
import moment from "moment";
import { INPUT_DATE_FORMAT } from "../../constants/app";

interface DatePickerProps {
  date: string;
  onChange: (date: string) => void;
  label?: string;
}

const DatePicker: FC<DatePickerProps> = ({ date, onChange, label }) => {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const changeHandler = (e: DateTimePickerEvent, selectedDate: any) => {
    if (e.type === "set") {
      onChange(moment(selectedDate).startOf("day").format(INPUT_DATE_FORMAT));
    } else if (e.type === "neutralButtonPressed") {
      onChange("");
    }
    setIsShowing(false);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setIsShowing((prevState) => !prevState)}
    >
      {label && <Text style={styles.label}>{label}</Text>}
      <Text style={styles.text}>
        {date !== "" ? moment(date).format("DD.MM.YYYY") : "Не указано"}
      </Text>
      <IconCalendarTime style={styles.icon} color={COLORS.secondaryIcon} />
      {isShowing && (
        <RNDateTimePicker
          value={date !== "" ? new Date(date) : new Date()}
          mode={"date"}
          is24Hour={true}
          neutralButton={{ label: "Очистить", textColor: "grey" }}
          onChange={changeHandler}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    maxHeight: 48,
    borderRadius: SIZES.borderRadius,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  label: {
    position: "absolute",
    left: 24,
    color: COLORS.secondaryText,
    fontWeight: "500",
    fontSize: 16,
  },
  text: {
    fontSize: 18,
    color: COLORS.primaryText,
    fontWeight: "500",
  },
  icon: {
    position: "absolute",
    right: 24,
  },
});

export default DatePicker;
