import { fireEvent, render, screen } from '@testing-library/react-native';
import FooterTextTouchable from '../../../src/components/ui/FooterTextTouchable';

describe('FooterTextTouchable', () => {
  const titleTxt = 'Test title';
  const mockOnPress = jest.fn();

  it('should render the footer text touchable component', () => {
    render(<FooterTextTouchable text={titleTxt} onPress={mockOnPress} />);

    const footerView = screen.getByTestId('footer-view');
    const footerButton = screen.getByTestId('footer-button');
    const footerText = screen.getByText(titleTxt);

    expect(footerView).toBeTruthy();
    expect(footerButton).toBeTruthy();
    expect(footerText).toBeTruthy();
  });

  it('should call onPress when Footer Button is pressed', () => {
    render(<FooterTextTouchable text={titleTxt} onPress={mockOnPress} />);

    fireEvent(screen.getByTestId('footer-button'), 'press');
    expect(mockOnPress).toHaveBeenCalled();
  });
});
