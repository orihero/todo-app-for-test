import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: {
  title: string;
  description: string;
  id: null | number;
} = {
  title: "",
  description: "",
  id: null,
};

const modalFormSlice = createSlice({
  name: "modalForm",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    clearModalForm: () => initialState,
  },
});

const selectModalFormStore = (state: RootState) => state.modalForm;

export const selectTitleOfForm = createSelector(
  [selectModalFormStore],
  (state) => state.title
);

export const selectDescriptionOfForm = createSelector(
  [selectModalFormStore],
  (state) => state.description
);

export const selectId = createSelector(
  [selectModalFormStore],
  (state) => state.id
);

export const { setDescription, setTitle, clearModalForm, setId } =
  modalFormSlice.actions;

export default modalFormSlice.reducer;
