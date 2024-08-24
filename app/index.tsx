import AddButton from "@/components/AddButton";
import ModalForm from "@/components/ModalForm";
import TodoList from "@/components/TodoList";
import { COLORS } from "@/constants/colors";
import { UseVisibility } from "@/hooks/useVisibility";
import { withAuth } from "@/hooks/withAuth";
import { useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";

function MyTodoScreen() {
  const modalRef = useRef<UseVisibility>(null);

  const onShowModal = useCallback(() => {
    modalRef.current?.show();
  }, []);
  return (
    <View style={styles.container}>
      <TodoList onShowModal={onShowModal} />
      <AddButton onAddPress={onShowModal} />
      <ModalForm _ref={modalRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    flex: 1,
    paddingTop: 30,
    backgroundColor: COLORS.white,
  },
});

export default withAuth(MyTodoScreen);
