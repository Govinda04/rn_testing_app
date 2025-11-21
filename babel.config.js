module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // 'react-native-reanimated/plugin', // THIS MUST BE LAST
    'react-native-worklets/plugin',
  ],
};
