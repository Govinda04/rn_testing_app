import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import RegisterScreen from '../../src/screens/RegisterScreen';
import { Provider } from 'react-redux';
import { persistor, store } from '../../src/redux/store';
import { navigate } from '../../src/utils/NavigationUtil';

jest.mock('../../src/utils/NavigationUtil', () => ({
  navigate: jest.fn(),
}));

jest.mock('redux-persist', () => ({
  persistStore: jest.fn().mockReturnValue({
    purge: jest.fn(),
  }),
  persistReducer: jest.requireActual('redux-persist').persistReducer,
}));

describe('Register Screen', () => {
  const fName = 'Saturo';
  const lName = 'Gojo';
  const email = 'saturo@sixeye.com';
  const pass = 'InfinityVoid';

  afterEach(() => {
    persistor.purge();
    jest.clearAllMocks();
  });

  test('should render Register screen correctly', () => {
    render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>,
    );

    const firstNameIp = screen.getByPlaceholderText('First name');
    const lastNameIp = screen.getByPlaceholderText('Last name');
    const emailEle = screen.getByPlaceholderText('Email');
    const passwordEle = screen.getByPlaceholderText('Password');
    const loginBtn = screen.getByText('Already have an account? Login In');

    expect(firstNameIp).toBeTruthy();
    expect(lastNameIp).toBeTruthy();
    expect(emailEle).toBeTruthy();
    expect(passwordEle).toBeTruthy();
    expect(loginBtn).toBeTruthy();
  });

  test('should validate all inputs', async () => {
    render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>,
    );

    const firstNameIp = screen.getByPlaceholderText('First name');
    const lastNameIp = screen.getByPlaceholderText('Last name');
    const emailEle = screen.getByPlaceholderText('Email');
    const passwordEle = screen.getByPlaceholderText('Password');
    const registerBtn = screen.getByTestId('Register');

    fireEvent(firstNameIp, 'changeText', '');
    fireEvent(lastNameIp, 'changeText', '');
    fireEvent(emailEle, 'changeText', '');
    fireEvent(passwordEle, 'changeText', '');
    fireEvent.press(registerBtn);

    await waitFor(() => {
      expect(screen.getByText('Please enter your first name')).toBeTruthy();
      expect(screen.getByText('Enter your last name')).toBeTruthy();
      expect(screen.getByText('Please enter your email')).toBeTruthy();
      expect(screen.getByText('Enter your password')).toBeTruthy();
    });
  });

  test('should update the inputs correctly', async () => {
    render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>,
    );

    const firstNameIp = screen.getByPlaceholderText('First name');
    const lastNameIp = screen.getByPlaceholderText('Last name');
    const emailEle = screen.getByPlaceholderText('Email');
    const passwordEle = screen.getByPlaceholderText('Password');
    const registerBtn = screen.getByTestId('Register');

    fireEvent(firstNameIp, 'changeText', fName);
    fireEvent(lastNameIp, 'changeText', lName);
    fireEvent(emailEle, 'changeText', email);
    fireEvent(passwordEle, 'changeText', pass);
    fireEvent.press(registerBtn);

    // await waitFor(() => {
    expect(firstNameIp.props.value).toBe(fName);
    expect(lastNameIp.props.value).toBe(lName);
    expect(emailEle.props.value).toBe(email);
    expect(passwordEle.props.value).toBe(pass);
    // });
  });

  test('should show error for invalid inputs', async () => {
    render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>,
    );

    const firstNameIp = screen.getByPlaceholderText('First name');
    const lastNameIp = screen.getByPlaceholderText('Last name');
    const emailEle = screen.getByPlaceholderText('Email');
    const passwordEle = screen.getByPlaceholderText('Password');
    const registerBtn = screen.getByTestId('Register');

    fireEvent(firstNameIp, 'changeText', fName);
    fireEvent(lastNameIp, 'changeText', lName);
    fireEvent(emailEle, 'changeText', 'abcd');
    fireEvent(passwordEle, 'changeText', pass);
    fireEvent.press(registerBtn);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email')).toBeTruthy();
    });
  });

  test('should remove error after input focus', async () => {
    render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>,
    );

    const firstNameIp = screen.getByPlaceholderText('First name');
    const lastNameIp = screen.getByPlaceholderText('Last name');
    const emailEle = screen.getByPlaceholderText('Email');
    const passwordEle = screen.getByPlaceholderText('Password');
    const registerBtn = screen.getByTestId('Register');

    fireEvent(firstNameIp, 'changeText', '');
    fireEvent(lastNameIp, 'changeText', '');
    fireEvent(emailEle, 'changeText', '');
    fireEvent(passwordEle, 'changeText', '');
    fireEvent.press(registerBtn);

    await waitFor(() => {
      expect(screen.getByText('Please enter your first name')).toBeTruthy();
      expect(screen.getByText('Enter your last name')).toBeTruthy();
      expect(screen.getByText('Please enter your email')).toBeTruthy();
      expect(screen.getByText('Enter your password')).toBeTruthy();
    });

    fireEvent(firstNameIp, 'focus');
    expect(screen.queryByText('Please enter your first name')).toBeNull();

    fireEvent(lastNameIp, 'focus');
    expect(screen.queryByText('Enter your last name')).toBeNull();

    fireEvent(emailEle, 'focus');
    expect(screen.queryByText('Please enter your email')).toBeNull();
    expect(screen.queryByText('Please enter a valid email')).toBeNull();

    fireEvent(passwordEle, 'focus');
    expect(screen.queryByText('Enter your password')).toBeNull();
  });

  test('should navigate to login screen on Login button press', async () => {
    render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>,
    );

    const loginBtn = screen.getByText('Already have an account? Login In');

    fireEvent.press(loginBtn);

    expect(navigate).toHaveBeenCalledWith('LoginScreen');
  });
});
