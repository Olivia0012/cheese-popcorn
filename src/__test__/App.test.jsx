import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import mockMatchMedia from './setupTests';

describe('Getflix test suite', () => {
  beforeAll(() => {
    mockMatchMedia();
  });
  
  it('should display the home page', () => {
    const { getAllByTestId } = render(<App />);

    expect(getAllByTestId('movie-search-view')).toBeTruthy();
  });
});
