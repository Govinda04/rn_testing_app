import { render, screen } from '@testing-library/react-native';
import OnboardItem from '../../../src/components/global/OnboardItem';

describe('OnboardItem', () => {
  const imageSource = '';
  const title = 'test title';
  const subtitle = 'test subtitle';
  const mockOnPressFirst = jest.fn();
  const buttonTitleFirst = 'button 1 title';
  const mockOnPressSecond = jest.fn();
  const buttonTitleSecond = 'button 2 title';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render onboard item with one button', () => {
    render(
      <OnboardItem
        imageSource={{ uri: imageSource }}
        title={title}
        subtitle={subtitle}
        onPressFirst={mockOnPressFirst}
        buttonTitleFirst={buttonTitleFirst}
      />,
    );

    const _title = screen.getByText(title);
    const _subtitle = screen.getByText(subtitle);
    const _btn1Title = screen.getByText(buttonTitleFirst);
    const _item = screen.getByTestId('background-image');

    expect(_title).toBeTruthy();
    expect(_subtitle).toBeTruthy();
    expect(_btn1Title).toBeTruthy();
    expect(_item).toBeTruthy();
  });

  it('should render onboard item with two button', () => {
    render(
      <OnboardItem
        imageSource={{ uri: imageSource }}
        title={title}
        subtitle={subtitle}
        onPressFirst={mockOnPressFirst}
        buttonTitleFirst={buttonTitleFirst}
        onPressSecond={mockOnPressSecond}
        buttonTitleSecond={buttonTitleSecond}
      />,
    );

    const _title = screen.getByText(title);
    const _subtitle = screen.getByText(subtitle);
    const _btn1Title = screen.getByText(buttonTitleFirst);
    const _btn2Title = screen.getByText(buttonTitleSecond);
    const _item = screen.getByTestId('background-image');

    expect(_title).toBeTruthy();
    expect(_subtitle).toBeTruthy();
    expect(_btn1Title).toBeTruthy();
    expect(_btn2Title).toBeTruthy();
    expect(_item).toBeTruthy();
  });
});
