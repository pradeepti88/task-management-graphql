import React from 'react';
import { render, screen } from '@testing-library/react';
import FilterList from './FilterList';

it('renders a message', () => {
  render(<FilterList />);
  expect(screen.getByText('Filter tasks by status')).toBeTruthy();
});
