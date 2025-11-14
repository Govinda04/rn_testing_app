import { act, fireEvent, render, screen } from '@testing-library/react-native';
import Input from '../../../src/components/ui/Input';

describe('Input', () => {
  // value: string;
  // onChangeText: (text: string) => void;
  // placeholder: string;
  // error?: string | undefined | null;
  // borderColor?: string;
  // disabled?: boolean;
  // onFocus?: () => void;
  // onBlur?: () => void;

  const mockOnchangeText = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnFocus = jest.fn();

  it('should render base Input component', () => {
    render(
      <Input
        value=""
        onChangeText={mockOnchangeText}
        placeholder="Enter text"
      />,
    );

    expect(screen.getByTestId('textInput')).toBeTruthy();
  });

  it('should handle multiple focus and blur events', () => {
    render(
      <Input
        value=""
        onChangeText={mockOnchangeText}
        placeholder="Enter text"
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
      />,
    );

    const inputElement = screen.getByTestId('textInput');

    fireEvent(inputElement, 'focus');
    fireEvent(inputElement, 'blur');
    fireEvent(inputElement, 'focus');
    fireEvent(inputElement, 'blur');

    expect(mockOnFocus).toHaveBeenCalledTimes(2);
    expect(mockOnBlur).toHaveBeenCalledTimes(2);
  });

  it('should render Input component with error message', () => {
    render(
      <Input
        value=""
        onChangeText={mockOnchangeText}
        placeholder="Enter text"
        error="This is an error"
      />,
    );

    const errorEle = screen.getByTestId('errorText');
    expect(errorEle).toHaveTextContent('This is an error');
  });

  it('should call onFocus and setFocus state on input focus', () => {
    render(
      <Input
        value=""
        onChangeText={mockOnchangeText}
        placeholder="Enter text"
        onFocus={mockOnFocus}
      />,
    );

    act(() => {
      fireEvent(screen.getByTestId('textInput'), 'focus', {});
    });
    expect(mockOnFocus).toHaveBeenCalled();
  });

  it('should render disabled Input component ', () => {
    render(
      <Input
        value=""
        onChangeText={mockOnchangeText}
        placeholder="Enter text"
        disabled={true}
      />,
    );

    const viewEle = screen.getByTestId('animatedView');
    const inputEle = screen.getByTestId('textInput');

    expect(viewEle).toHaveStyle({ pointerEvents: 'none' });
    expect(inputEle.props.editable).toBe(false);
  });

  it('should call default onFocus function when not provided', () => {
    render(
      <Input
        value=""
        onChangeText={mockOnchangeText}
        placeholder="Enter text"
      />,
    );

    const inputEle = screen.getByTestId('textInput');

    act(() => {
      fireEvent(inputEle, 'focus', {});
    });
  });

  it('should call default onBlur function when not provided', () => {
    render(
      <Input
        value=""
        onChangeText={mockOnchangeText}
        placeholder="Enter text"
      />,
    );

    const inputEle = screen.getByTestId('textInput');

    act(() => {
      fireEvent(inputEle, 'blur', {});
    });
  });
});
