import App from '../App';
import {render} from '@testing-library/react-native';

test('Snapshot ', () => {
  const {toJSON} = render(<App />);
  expect(toJSON()).toMatchSnapshot();
});
