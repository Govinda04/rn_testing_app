import {
  createNavigationContainerRef,
  CommonActions,
  StackActions,
} from '@react-navigation/native';
import {
  goBack,
  navigate,
  navigationRef,
  prepareNavigation,
  push,
  resetAndNavigate,
} from '../../src/utils/NavigationUtil';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');

  return {
    ...actualNav,
    createNavigationContainerRef: jest.fn(() => ({
      dispatch: jest.fn(),
      isReady: jest.fn().mockReturnValue(true),
    })),
    CommonActions: {
      reset: jest.fn(),
      goBack: jest.fn(),
      navigate: jest.fn(),
    },
    StackActions: {
      push: jest.fn(),
    },
  };
});

describe('Navigation functions', () => {
  test('should navigate to page', async () => {
    const routeName = 'TestRoute';
    const routeParams = { key: 'val', id: 123 };
    await navigate(routeName, routeParams);

    expect(CommonActions.navigate).toHaveBeenCalledWith(routeName, routeParams);
  });

  test('should reset stack And Navigate to page ', async () => {
    const routeName = 'TestRoute';

    await resetAndNavigate(routeName);

    expect(CommonActions.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: routeName }],
    });
  });

  test('should navigate back from page', async () => {
    await goBack();
    expect(CommonActions.goBack).toHaveBeenCalled();
  });

  test('should push new screen in stack', async () => {
    const routeName = 'TestRoute';
    const routeParams = { key: 'val', id: 123 };
    await push(routeName, routeParams);

    expect(StackActions.push).toHaveBeenCalledWith(routeName, routeParams);
  });

  test('should prepare navigation', async () => {
    await prepareNavigation();
    expect(navigationRef.isReady).toHaveBeenCalled();
  });
});
