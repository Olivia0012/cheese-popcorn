import { render } from '@testing-library/react';
import App from './App';

describe('App test suite', () => {
  test('Logo should be displayed in the navbar', () => {
    const { getByText } = render(<App />);
    const text = getByText('Cheese Popcorn 🍿');
    expect(text).toBeInTheDocument();
  });

  test('Input field should be displayed in the navbar', () => {
    const { findByLabelText } = render(<App />);
    const text = findByLabelText('input');
    expect(text).toBeTruthy();
  });

  test('Result number field should be displayed in the navbar', () => {
    const { getByText } = render(<App />);
    const text = getByText('Found 0 results');
    expect(text).toBeTruthy();
  });
});


