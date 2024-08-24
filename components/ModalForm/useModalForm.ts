import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearModalForm,
  selectDescriptionOfForm,
  selectTitleOfForm,
  setDescription,
  setTitle,
} from "@/store/slices/ModalFormSlice";
import { useCallback } from "react";

export const useModalForm = () => {
  const dispatch = useAppDispatch();
  const title = useAppSelector(selectTitleOfForm);
  const description = useAppSelector(selectDescriptionOfForm);

  const onChangeTitle = useCallback((value: string) => {
    dispatch(setTitle(value));
  }, []);
  const onChangeDescription = useCallback((value: string) => {
    dispatch(setDescription(value));
  }, []);

  const clearAllInputs = useCallback(() => {
    dispatch(clearModalForm());
  }, []);

  return {
    title,
    description,
    onChangeTitle,
    onChangeDescription,
    clearAllInputs,
  };
};
