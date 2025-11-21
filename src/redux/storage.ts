import { Storage } from 'redux-persist';
import { createMMKV } from 'react-native-mmkv';
// import { v4 as uuidv4 } from 'uuid';

const storage = createMMKV();
// const storage = new MMKV({
//   id: uuidv4,
// });

const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.remove(key);
    return Promise.resolve();
  },
};

export default reduxStorage;
