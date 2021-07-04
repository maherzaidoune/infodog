import React from 'react';
import Pie from '.';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Pie fill={50} icon={'test'} color={'red'} />).toJSON();
  expect(tree).toMatchSnapshot();
});
