import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('redux-persist', () => {
    const real = jest.requireActual('redux-persist');
    return {
      ...real,
      persistReducer: jest
        .fn()
        .mockImplementation((config, reducers) => reducers),
    };
  });

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-config', () => ({
    BASE_API_URL: 'test'
}))

// navbar have navigation element. ignore it for now
jest.mock('../src/components/Navbar.tsx', () => () => null)
