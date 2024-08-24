import { StyleSheet, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useDeleteTodoMutation } from "@/store/services/features/TodoApi";
import { useCallback } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setDescription, setId, setTitle } from "@/store/slices/ModalFormSlice";
import { Todo } from "@/@types";

export default function ButtonGroup({
  id,
  description,
  title,
  onShowModal,
}: Pick<Todo, "id" | "description" | "title"> & { onShowModal: () => void }) {
  const [deleteTodo, { isLoading }] = useDeleteTodoMutation();
  const dispatch = useAppDispatch();

  const onRemoveTodo = useCallback(async () => {
    await deleteTodo({ id });
  }, []);
  const onEditTodo = useCallback(() => {
    dispatch(setId(id));
    dispatch(setTitle(title));
    dispatch(setDescription(description));
    onShowModal();
  }, []);
  return (
    <View style={styles.buttonGroup}>
      <TouchableOpacity onPress={onEditTodo}>
        <Feather name="edit-2" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onRemoveTodo}>
        <MaterialCommunityIcons name="delete-outline" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 17,
    top: 19,
    gap: 16,
  },
});
