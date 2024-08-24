import { Status } from "@/@types";
import { COLORS } from "@/constants/colors";
import { FontFamily } from "@/constants/fonts";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getStatusColor } from "./utils";
import { useUpdateStatusMutation } from "@/store/services/features/TodoApi";

interface TodoStatusProps {
  status: Status;
  id: number;
}

export default function TodoStatus({ status, id }: TodoStatusProps) {
  const [updateStatus] = useUpdateStatusMutation();
  const [loadingStatus, setLoadingStatus] = useState<Status | null>(null);

  const statusConfig = useMemo(
    () => [
      {
        label: "Pending",
        status: Status.pending,
        color: COLORS.yellow,
      },
      {
        label: "Done",
        status: Status.done,
        color: COLORS.green,
      },
      {
        label: "Won’t do",
        status: Status.wontdo,
        color: COLORS.red,
      },
    ],
    []
  );

  const makeLayoutAnimation = useCallback(() => {
    LayoutAnimation.easeInEaseOut();
  }, []);

  const handlePress = useCallback(async (status: Status) => {
    setLoadingStatus(status);
    await updateStatus({ status, id });
    setLoadingStatus(null);
    makeLayoutAnimation();
  }, []);

  return (
    <View style={styles.buttonGroup}>
      {statusConfig.map(({ label, status: btnStatus, color }) => (
        <TouchableOpacity
          key={label}
          onPress={() => handlePress(btnStatus)}
          style={[
            styles.button,
            {
              borderColor:
                status === btnStatus ? getStatusColor(status) : color,
              backgroundColor:
                status === btnStatus ? getStatusColor(status) : COLORS.white,
            },
          ]}
          disabled={loadingStatus === btnStatus}
        >
          {loadingStatus === btnStatus ? (
            <ActivityIndicator
              size="small"
              color={getStatusColor(loadingStatus)}
            />
          ) : (
            <Text
              style={[
                styles.buttonText,
                { color: status === btnStatus ? COLORS.white : color },
              ]}
            >
              {label}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 14,
    fontFamily: FontFamily.LexendDeca_400Regular,
    color: COLORS.black,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: -20,
    paddingTop: 23,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 100,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
});
