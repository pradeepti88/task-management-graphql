import React from 'react';
import { render, screen } from '@testing-library/react';
import FilterLink from './FilterLink';
import { Done } from '@mui/icons-material';

it('renders children on to the screen', () => {
  render(<FilterLink>Completed</FilterLink>);
  expect(screen.getByText('Completed')).toBeTruthy();
});

it('renders correct icon on to the screen', () => {
  render(<FilterLink icon={<Done />}>Completed</FilterLink>);
  expect(screen.getByTestId('DoneIcon')).toBeTruthy();
});
