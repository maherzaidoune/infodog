import React from 'react';
import Bar from '.';

import renderer from 'react-test-renderer';

test('Bar renders correctly', () => {
  const tree = renderer.create(<Bar data={[]}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
