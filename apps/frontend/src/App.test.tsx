import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders shopster homepage', () => {
  render(<App />);
  const shopsterElement = screen.getByText(/shopster/i);
  expect(shopsterElement).toBeTruthy();
});
