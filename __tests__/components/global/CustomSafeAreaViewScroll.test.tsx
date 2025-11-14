import { render, screen } from '@testing-library/react-native';
import CustomSafeAreaScrollView from '../../../src/components/global/CustomSafeAreaViewScroll';
import { Text } from 'react-native';

describe('Custom Safe area view scroll', () => {
  it('should render scroll view with children', () => {
    const _childTxt = 'Test children';
    render(
      <CustomSafeAreaScrollView>
        <Text>{_childTxt}</Text>
      </CustomSafeAreaScrollView>,
    );

    const childTxt = screen.getByTestId('safe-area-view');

    expect(childTxt).toHaveTextContent(_childTxt, { exact: false });
  });
});
