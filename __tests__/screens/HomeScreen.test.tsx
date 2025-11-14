import { render, screen } from '@testing-library/react-native';
import HomeScreen from '../../src/screens/HomeScreen';

describe('HomeScreen', () => {
  test('should show Homescreen', () => {
    render(<HomeScreen />);

    expect(screen.getByText('Testing Complete')).toBeTruthy();
  });
});
