import { Dimensions, Platform, PixelRatio } from 'react-native';

export const SMALL_FONT = 14;
export const MEDIUM_FONT = 16;
export const LARGE_FONT = 18;

// eslint-disable-next-line no-unused-vars
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function actuatedNormalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}
