import { fireEvent, render, screen } from '@testing-library/react-native';
import CustomHeading from '../../../src/components/global/CustomHeading';
import { goBack } from '../../../src/utils/NavigationUtil';

/// mock goBack function
jest.mock('../../../src/utils/NavigationUtil', () => {
  return {
    goBack: jest.fn(),
  };
});
// // Mock go back function
// jest.mock('../../src/utils/NavigationUtil', () => ({
//   goBack: jest.fn(),
// }));

describe('Custom Heading', () => {
  const title = 'Test title';

  it('should render custom heading', () => {
    render(<CustomHeading title={title} />);

    const titleTxt = screen.getByText(title);
    expect(titleTxt).toBeTruthy();
  });

  it('should call go back on back button press of custom heading', () => {
    render(<CustomHeading title={title} />);

    const titleTxt = screen.getByText(title);
    expect(titleTxt).toBeTruthy();

    const backBtn = screen.getByTestId('back-button');

    expect(backBtn).toBeTruthy();

    fireEvent.press(backBtn);
    expect(goBack).toHaveBeenCalled();
  });
});
