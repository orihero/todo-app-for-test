import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import TodoItem from "./TodoItem";
import { useGetTodosQuery } from "@/store/services/features/TodoApi";
import { useCallback } from "react";
import { Todo } from "@/@types";

export default function TodoList({ onShowModal }: { onShowModal: () => void }) {
  const { data: todoList } = useGetTodosQuery();

  const renderItem: ListRenderItem<Todo> = useCallback(
    ({ item: todo }) => <TodoItem {...todo} onShowModal={onShowModal} />,
    []
  );
  return (
    <FlatList
      data={todoList ?? []}
      contentContainerStyle={styles.container}
      keyExtractor={(todo) => `todo - ${todo.id}`}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 17,
  },
});
