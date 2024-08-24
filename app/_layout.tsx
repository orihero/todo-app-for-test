import { Stack } from "expo-router";
import "react-native-reanimated";
import { LogBox } from "react-native";
import {
  useFonts,
  LexendDeca_100Thin,
  LexendDeca_200ExtraLight,
  LexendDeca_300Light,
  LexendDeca_400Regular,
  LexendDeca_500Medium,
  LexendDeca_600SemiBold,
  LexendDeca_700Bold,
  LexendDeca_800ExtraBold,
  LexendDeca_900Black,
} from "@expo-google-fonts/lexend-deca";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/store/store";

LogBox.ignoreLogs([
  "Require cycle: store/store.ts -> store/services/features/TodoApi.ts -> store/services/ApiBaseQuery.ts -> store/services/ApiClient.ts -> store/store.ts",
]);

export default function RootLayout() {
  useFonts({
    LexendDeca_100Thin,
    LexendDeca_200ExtraLight,
    LexendDeca_300Light,
    LexendDeca_400Regular,
    LexendDeca_500Medium,
    LexendDeca_600SemiBold,
    LexendDeca_700Bold,
    LexendDeca_800ExtraBold,
    LexendDeca_900Black,
  });
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack>
          <Stack.Screen name="index" options={{ headerTitle: "My To-Do" }} />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
