module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
          '@screens': './src/screens',
          '@assets': './src/assets',
          '@components': './src/components',
          '@entities': './src/entities',
          '@styles': './src/styles',
          '@types': './src/types',
          '@hooks': './src/hooks',
          '@navigations': './src/navigations',
          '@services': './src/services',
          '@stores': './src/stores',
          '@utils': './src/utils',
        },
      },
    ],
    'react-native-unistyles/plugin',
    'react-native-reanimated/plugin',
  ],
};
