import React from 'react';
import { render } from '@testing-library/react';
import Loading from '../../components/Loading';

test('renders learn react link', () => {
  const app = render(<Loading height={1} />);
  expect(app.container).toBeInTheDocument();
});
