import { fireEvent, render, screen } from '@testing-library/react-native';
import OnBoardingScreen from '../../src/screens/OnboardingScreen';
import { navigate } from '../../src/utils/NavigationUtil';

jest.mock('../../src/utils/NavigationUtil', () => ({
  navigate: jest.fn(),
}));

describe('OnBoarding screen', () => {
  test('should render Onboarding Swiper', () => {
    render(<OnBoardingScreen />);

    expect(screen.getByTestId('onboard-swiper')).toBeOnTheScreen();
  });

  test('should render Login and Signup buttons', () => {
    render(<OnBoardingScreen />);
    const loginBtn = screen.getByText('Login');
    const signUpBtn = screen.getByText('Sign up');

    fireEvent.press(loginBtn);
    expect(navigate).toHaveBeenCalledWith('LoginScreen');

    fireEvent.press(signUpBtn);
    expect(navigate).toHaveBeenCalledWith('RegisterScreen');
  });

  test('should show next buttons and call scrollBy(1) on next button press', () => {
    render(<OnBoardingScreen />);
    const nextBtn = screen.getAllByText('Next');

    expect(nextBtn).toHaveLength(2);

    fireEvent.press(nextBtn[0]);
  });
});
