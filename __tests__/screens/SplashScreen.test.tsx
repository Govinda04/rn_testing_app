import { render, screen, waitFor } from '@testing-library/react-native';
import SplashScreen from '../../src/screens/SplashScreen';
import {
  prepareNavigation,
  resetAndNavigate,
} from '../../src/utils/NavigationUtil';

jest.mock('../../src/utils/NavigationUtil', () => ({
  prepareNavigation: jest.fn(),
  resetAndNavigate: jest.fn(),
}));

describe('Splash screen', () => {
  test('should first', () => {
    expect(1 + 2).toBe(3);
  });
  test('should display splash screen with Logo and loader', () => {
    render(<SplashScreen />);

    const img = screen.getByTestId('logo-image');
    const loader = screen.getByTestId('loading-indicator');

    expect(img).toBeOnTheScreen();
    expect(loader).toBeOnTheScreen();
  });

  test('should call prepareNavigation on comp mount', () => {
    render(<SplashScreen />);
    expect(prepareNavigation).toHaveBeenCalled();
  });

  test('should navigate to OnBoardingScreen after 3s of comp mount', async () => {
    render(<SplashScreen />);

    await waitFor(
      () => {
        expect(resetAndNavigate).toHaveBeenCalledWith('OnBoardingScreen');
      },
      {
        timeout: 3500, // wait slightly more than 3s
      },
    );
  });
});
