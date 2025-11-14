import { render, screen } from '@testing-library/react-native';
import CustomButton from '../../../src/components/ui/CustomButton';
import { Colors } from '../../../src/utils/Colors';

describe('CustomButton', () => {
  const mockOnPress = jest.fn();
  const title = 'Test title';
  const backgroundColor = 'red';
  const textColor = 'green';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render base Custom Button', () => {
    render(<CustomButton onPress={mockOnPress} title={title} />);

    expect(screen.getAllByText(title)).toBeTruthy();
    const _custBtn = screen.getByTestId('custom-button');
    // backgroundColor
    expect(_custBtn).toHaveStyle({
      backgroundColor: Colors.primary,
    });
  });

  it('should render Custom Button with text and style', () => {
    render(
      <CustomButton
        onPress={mockOnPress}
        title={title}
        backgroundColor={backgroundColor}
        textColor={textColor}
      />,
    );

    const _custBtn = screen.getByTestId('custom-button');
    const _custBtnTxt = screen.getByTestId('custom-button-txt');

    expect(_custBtn).toHaveStyle({
      backgroundColor: backgroundColor,
    });
    expect(_custBtnTxt).toHaveStyle({
      color: textColor,
    });

    expect(screen.getByText(title)).toBeTruthy();
  });

  it('should render Custom Button with loader', () => {
    render(<CustomButton onPress={mockOnPress} title={title} loading={true} />);

    const _loader = screen.getByTestId('activity-indicator');

    // expect(_loader).toBeVisible();
    expect(_loader).toBeOnTheScreen();
  });

  it('should render base Custom Button with provide props', () => {
    render(
      <CustomButton
        onPress={mockOnPress}
        title={title}
        activeOpacity={0}
        // custom props
        style={{
          borderWidth: 1,
        }}
      />,
    );

    expect(screen.getAllByText(title)).toBeTruthy();

    const _custBtn = screen.getByTestId('custom-button');
    // expect(_custBtn).toHaveProp('activeOpacity', 0.4);
    // console.log('_custBtn', _custBtn.props);
    expect(_custBtn).toHaveStyle({ borderWidth: 1 });
    // expect(_custBtn).toHaveProp('disabled');
  });
});
