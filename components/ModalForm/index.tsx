import { COLORS } from "@/constants/colors";
import { DEBUG } from "@/constants/global";
import useVisibility, { UseVisibility } from "@/hooks/useVisibility";
import { useAppSelector } from "@/store/hooks";
import {
  useAddNewTodoMutation,
  useUpdateTodoMutation,
} from "@/store/services/features/TodoApi";
import { selectId } from "@/store/slices/ModalFormSlice";
import { BlurView } from "expo-blur";
import { RefObject, useCallback, useImperativeHandle, useMemo } from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";
import { ModalFormButtonGroup, ModalFormInputGroup } from "./ui";
import { useModalForm } from "./useModalForm";

interface ModalFormProps {
  _ref?: RefObject<UseVisibility>;
}

export default function ModalForm({ _ref }: ModalFormProps) {
  const modal = useVisibility();
  useImperativeHandle(_ref, () => modal);

  const selectedTodoId = useAppSelector(selectId);
  const [addNewTodo, { isLoading: isLoadingOfCreating }] =
    useAddNewTodoMutation();
  const [updateTheTodo, { isLoading: isLoadingOfUpdating }] =
    useUpdateTodoMutation();

  const { description, title, clearAllInputs } = useModalForm();
  const isVisiblity = useMemo(
    () => !!description && !!title,
    [description, title]
  );
  const onCancel = useCallback(() => {
    _ref?.current?.hide();
    clearAllInputs();
  }, []);

  const onCreateNewTodo = useCallback(async () => {
    const newTask = { title, description };
    try {
      await addNewTodo(newTask);
      clearAllInputs();
      _ref?.current?.hide();
    } catch (err) {
      if (DEBUG) console.error(err);
    }
  }, [title, description]);

  const onUpdateTodo = useCallback(async () => {
    const changedTodo = { title, description };
    try {
      await updateTheTodo({ ...changedTodo, id: selectedTodoId! });
      clearAllInputs();
      _ref?.current?.hide();
    } catch (err) {
      if (DEBUG) console.error(err);
    }
  }, [title, description, selectedTodoId]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal.visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        modal.toggle();
      }}
    >
      <BlurView intensity={10} style={styles.centeredView}>
        <View style={styles.modalView}>
          <ModalFormInputGroup />
          <ModalFormButtonGroup
            onCancel={onCancel}
            loading={isLoadingOfCreating || isLoadingOfUpdating}
            btnText={selectedTodoId ? "Save" : "Done"}
            onDone={async () => {
              if (isVisiblity) {
                if (selectedTodoId) {
                  await onUpdateTodo();
                } else {
                  await onCreateNewTodo();
                }
              }
            }}
          />
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingHorizontal: 13,
    paddingVertical: 22,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 32,
    elevation: 5,
    width: "80%",
  },
});
