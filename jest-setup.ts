import '@testing-library/react-native';
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/src/private/animated/NativeAnimatedHelper');

// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock('react-native-reanimated', () => {
  //   const Reanimated = require('react-native-reanimated/mock');
  const Reanimated = require('react-native-reanimated/src/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/src/private/animated/NativeAnimatedHelper');

jest.mock('react-native-mmkv', () => {
  return {
    MMKV: jest.fn().mockImplementation(() => ({
      set: jest.fn(),
      getString: jest.fn(),
      delete: jest.fn(),
    })),
  };
});
