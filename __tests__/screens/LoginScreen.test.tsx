import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import LoginScreen from '../../src/screens/LoginScreen';
import { Provider } from 'react-redux';
import { persistor, store } from '../../src/redux/store';
import { navigate } from '../../src/utils/NavigationUtil';
import { loginUser } from '../../src/redux/reducers/userSlice';

jest.mock('../../src/utils/NavigationUtil', () => ({
  navigate: jest.fn(),
}));

jest.mock('redux-persist', () => ({
  persistStore: jest.fn().mockReturnValue({
    purge: jest.fn(),
  }),
  persistReducer: jest.requireActual('redux-persist').persistReducer,
}));

describe('Login screen', () => {
  const email = 'test@gmail.com';
  const pass = 'Password@1234';

  beforeEach(() => {
    persistor.purge();
    jest.clearAllMocks();
  });

  test('should render correctly', () => {
    render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );

    const emailEle = screen.getByPlaceholderText('Email');
    const passwordEle = screen.getByPlaceholderText('Password');

    expect(emailEle).toBeTruthy();
    expect(passwordEle).toBeTruthy();
  });

  test('should update the text inputs', () => {
    render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );

    const emailEle = screen.getByPlaceholderText('Email');
    const passwordEle = screen.getByPlaceholderText('Password');

    fireEvent(emailEle, 'changeText', email);
    fireEvent(passwordEle, 'changeText', pass);

    expect(emailEle.props.value).toBe(email);
    expect(passwordEle.props.value).toBe(pass);
  });

  test('should show error for invalid inputs', async () => {
    render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );

    const emailEle = screen.getByPlaceholderText('Email');
    const passwordEle = screen.getByPlaceholderText('Password');
    const loginBtn = screen.getByTestId('Login');

    fireEvent(emailEle, 'changeText', '');
    fireEvent(passwordEle, 'changeText', '');
    fireEvent.press(loginBtn);

    await waitFor(() => {
      expect(screen.getByText('Please enter your email')).toBeTruthy();
      expect(screen.getByText('Enter your password')).toBeTruthy();
    });
  });

  test('should show error for invalid email', async () => {
    render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );

    const emailEle = screen.getByPlaceholderText('Email');
    const passwordEle = screen.getByPlaceholderText('Password');
    const loginBtn = screen.getByTestId('Login');

    fireEvent(emailEle, 'changeText', 'aaaaabb111');
    fireEvent(passwordEle, 'changeText', pass);
    fireEvent.press(loginBtn);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email')).toBeTruthy();
    });
  });

  test('should show error for invalid password', async () => {
    render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );

    const emailEle = screen.getByPlaceholderText('Email');
    const passwordEle = screen.getByPlaceholderText('Password');
    const loginBtn = screen.getByTestId('Login');

    fireEvent(emailEle, 'changeText', email);
    fireEvent(passwordEle, 'changeText', '');
    fireEvent.press(loginBtn);

    await waitFor(() => {
      expect(screen.getByText('Enter your password')).toBeTruthy();
    });
  });

  test('should hide error after email focus', async () => {
    render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );

    const emailEle = screen.getByPlaceholderText('Email');
    const passwordEle = screen.getByPlaceholderText('Password');
    const loginBtn = screen.getByTestId('Login');

    fireEvent(emailEle, 'changeText', 'aaaa');
    fireEvent(passwordEle, 'changeText', pass);
    fireEvent.press(loginBtn);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email')).toBeTruthy();
    });

    fireEvent(emailEle, 'focus');
    expect(screen.queryByText('Please enter a valid email')).toBeNull();
  });
  test('should hide error after password focus', async () => {
    render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );

    const emailEle = screen.getByPlaceholderText('Email');
    const passwordEle = screen.getByPlaceholderText('Password');
    const loginBtn = screen.getByTestId('Login');

    fireEvent(emailEle, 'changeText', email);
    fireEvent(passwordEle, 'changeText', '');
    fireEvent.press(loginBtn);

    await waitFor(() => {
      expect(screen.getByText('Enter your password')).toBeTruthy();
    });

    fireEvent(passwordEle, 'focus');
    expect(screen.queryByText('Enter your password')).toBeNull();
  });

  test('should handle successful login', async () => {
    render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );

    const emailEle = screen.getByPlaceholderText('Email');
    const passwordEle = screen.getByPlaceholderText('Password');
    const loginBtn = screen.getByTestId('Login');

    fireEvent(emailEle, 'changeText', email);
    fireEvent(passwordEle, 'changeText', pass);
    fireEvent.press(loginBtn);

    const action = await store.dispatch(
      loginUser({ email: email, password: pass }),
    );
    expect(action.type).toBe(loginUser.fulfilled.type);
  });

  test('should navigate to registration screen', () => {
    render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );
    const register5Btn = screen.getByText("Don't have an account? Sign Up");

    fireEvent.press(register5Btn);

    expect(navigate).toHaveBeenCalledWith('RegisterScreen');
  });
});

/**
 * 1. check if inputs value can be changed
 * 2. check if error messages are shown for invalid inputs
 * 3. check if error ios are cleared on input focus
 *
 * 4. check if loginHandler is called on button press with valid inputs
 * 5. check if navigation to HomeScreen occurs after successful login
 */
