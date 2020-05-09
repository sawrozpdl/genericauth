import React from 'react';
import { render } from '@testing-library/react';
import App from '../../App';

test('renders learn react link', () => {
  const app = render(<App />);
  expect(app.container).toBeInTheDOM();
});

test('prevent app deploy', () => {
  expect(false).toBeTruthy();
});
