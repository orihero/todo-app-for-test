import { Tokens } from "@/@types";
import { DEBUG } from "@/constants/global";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getTokens(): Promise<Tokens | null> {
  let tokens: Tokens | null = null;
  try {
    const data = await AsyncStorage.getItem("persist:root");
    if (data) {
      tokens = await JSON.parse(await JSON.parse(data).localStore).tokens;
    }
  } catch (err) {
    if (DEBUG) console.log(err);
  }

  return tokens;
}
