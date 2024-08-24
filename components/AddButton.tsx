import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/constants/colors";
import { normalizeHeight } from "@/constants/dimensions";
import { HIT_SLOP } from "@/constants/styles";

interface AddButtonProps {
  onAddPress?(): void;
}

export default function AddButton({ onAddPress }: AddButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.5}
      onPress={onAddPress}
      hitSlop={HIT_SLOP}
    >
      <Ionicons name="add-sharp" size={24} color={COLORS.white} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 55,
    backgroundColor: COLORS.purple,
    position: "absolute",
    bottom: normalizeHeight(40),
    alignSelf: "center",
  },
});
