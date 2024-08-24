import { Spacing } from "@/components/Spacing";
import { COLORS } from "@/constants/colors";
import { normalizeHeight } from "@/constants/dimensions";
import { FontFamily } from "@/constants/fonts";
import { HIT_SLOP } from "@/constants/styles";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ButtonGroupProps {
  onCancel?(): void;
  onDone?(): void;
  loading?: boolean;
  btnText: string;
}

export default function ButtonGroup({
  onCancel,
  onDone,
  loading = false,
  btnText = "done",
}: ButtonGroupProps) {
  return (
    <>
      <Spacing steps={2} />
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          activeOpacity={0.5}
          hitSlop={HIT_SLOP}
          onPress={onCancel}
        >
          <Text style={[styles.baseText, styles.cancelButtonText]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.doneButton]}
          activeOpacity={0.5}
          hitSlop={HIT_SLOP}
          onPress={onDone}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={[styles.baseText, styles.doneButtonText]}>
              {btnText}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontSize: normalizeHeight(16),
    fontFamily: FontFamily.LexendDeca_400Regular,
  },

  cancelButtonText: {
    color: COLORS.purple,
  },
  doneButtonText: {
    color: COLORS.white,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: 140,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    borderColor: COLORS.purple,
  },
  doneButton: {
    borderColor: COLORS.purple,
    backgroundColor: COLORS.purple,
  },
  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
