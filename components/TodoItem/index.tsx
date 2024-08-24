import { COLORS } from "@/constants/colors";
import { normalizeHeight } from "@/constants/dimensions";
import { FontFamily } from "@/constants/fonts";
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TodoItemButtonGroup } from "./ui";
import TodoStatus from "../TodoStatus";
import { Status, Todo } from "@/@types";
import { memo, useCallback } from "react";
import useVisibility from "@/hooks/useVisibility";
import { getStatusColor } from "../TodoStatus/utils";

function TodoItem({
  description,
  title,
  status,
  id,
  onShowModal,
}: Todo & { onShowModal: () => void }) {
  const statusVisiblity = useVisibility();

  const makeLayoutAnimation = useCallback(() => {
    LayoutAnimation.easeInEaseOut();
  }, []);

  const onTogglePressItem = useCallback(() => {
    makeLayoutAnimation();
    statusVisiblity.toggle();
  }, []);
  return (
    <TouchableOpacity
      style={[styles.container, { borderColor: getStatusColor(status) }]}
      activeOpacity={0.5}
      onPress={onTogglePressItem}
    >
      <ColoredCircle status={status} />
      <View>
        <Text style={[styles.baseText, styles.title]}>{title}</Text>
        <Text style={[styles.baseText, styles.description]}>{description}</Text>
      </View>
      <TodoItemButtonGroup
        {...{ id, description, title }}
        onShowModal={onShowModal}
      />
      {statusVisiblity.visible && <TodoStatus status={status} id={id} />}
    </TouchableOpacity>
  );
}

const ColoredCircle = ({ status }: { status: Status }) => (
  <View style={[styles.circle, { backgroundColor: getStatusColor(status) }]} />
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 32,
    elevation: 5,
    borderWidth: 0.4,
    borderColor: COLORS.green,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: COLORS.green,
    position: "absolute",
    left: 8,
    top: 8,
  },
  baseText: {
    fontFamily: FontFamily.LexendDeca_400Regular,
  },
  title: {
    fontSize: normalizeHeight(9),
    color: COLORS.gray,
    paddingBottom: 2,
  },
  description: {
    fontSize: normalizeHeight(14),
    color: COLORS.black,
    fontFamily: FontFamily.LexendDeca_500Medium,
    width: "80%",
  },
});

export default memo(TodoItem);
