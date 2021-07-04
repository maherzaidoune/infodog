import React from 'react';

import renderer from 'react-test-renderer';
import ChartHelper from '.';

test('ChartHelper renders correctly', () => {
  const tree = renderer.create(<ChartHelper frequency={1}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
