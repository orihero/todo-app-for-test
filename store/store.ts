import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import localStore from "./LocalStore";
import modalFormReducer from "./slices/ModalFormSlice";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { TodoApi } from "./services/features/TodoApi";

const reducers = combineReducers({
  [TodoApi.reducerPath]: TodoApi.reducer,
  modalForm: modalFormReducer,
  localStore: localStore.reducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["localStore"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      TodoApi.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
