import { RootState, store } from '../../../src/redux/store';
import {
  loginUser,
  registerUser,
  selectUser,
  setUser,
} from '../../../src/redux/reducers/userSlice';

jest.mock('redux-persist', () => {
  const actualReduxPersist = jest.requireActual('redux-persist');
  return {
    ...actualReduxPersist,
    persistStore: jest.fn().mockReturnValue({}),
  };
});

describe('User Slice', () => {
  test('should handle initial state', () => {
    const state = store.getState() as RootState;

    expect(selectUser(state)).toBeNull();
  });

  test('should handle set user', () => {
    const user = { name: 'John Doe', email: 'john.doe@example.com' };
    store.dispatch(setUser(user));
    const state = store.getState() as RootState;

    expect(selectUser(state)).toEqual(user);
  });
});

describe('Register User Thunk', () => {
  test('should handle register user success', async () => {
    const user = { name: 'John Doe', email: 'john.doe@example.com' };
    const action = await store.dispatch(registerUser(user));

    const state = store.getState() as RootState;
    expect(action.type).toBe(registerUser.fulfilled.type);

    expect(selectUser(state)).toEqual(user);
  });

  test('should handle register user failure', async () => {
    const action = await store.dispatch(registerUser({}));

    const state = store.getState() as RootState;
    expect(action.type).toBe(registerUser.rejected.type);

    expect(selectUser(state)).toBeNull();
  });
});

describe('Login User Thunk', () => {
  test('should handle login user success', async () => {
    const user = { password: '123456', email: 'john.doe@example.com' };
    const action = await store.dispatch(loginUser(user));

    const state = store.getState() as RootState;
    expect(action.type).toBe(loginUser.fulfilled.type);

    expect(selectUser(state)).toEqual(user);
  });

  test('should handle login user failure', async () => {
    const action = await store.dispatch(loginUser({}));

    const state = store.getState() as RootState;
    expect(action.type).toBe(loginUser.rejected.type);

    expect(selectUser(state)).toBeNull();
  });
});
