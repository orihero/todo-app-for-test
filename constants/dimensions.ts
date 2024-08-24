import { Dimensions, PixelRatio } from "react-native";
import { isIOS } from "./platform";

const { width, height } = Dimensions.get("window");

const SIZES = {
  width,
  height,
};

// size of Figma design layout
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

const scaleWidth = SIZES.width / BASE_WIDTH;
const scaleHeight = SIZES.height / BASE_HEIGHT;

const normalizeWidth = (size: number) => {
  const newSize = size * scaleWidth;
  const normalizedSize = Math.round(PixelRatio.roundToNearestPixel(newSize));

  return isIOS ? normalizedSize : normalizedSize - 1;
};

const normalizeHeight = (size: number) => {
  const newSize = size * scaleHeight;
  const normalizedSize = Math.round(PixelRatio.roundToNearestPixel(newSize));

  return isIOS ? normalizedSize : normalizedSize - 1;
};

export { normalizeWidth, normalizeHeight, SIZES };
