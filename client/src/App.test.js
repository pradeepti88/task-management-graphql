import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import App from './App';

const mocks = []; // We'll fill this in next

it('App component renders without any error', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
  );
  expect(await screen.findByText('Task Management')).toBeInTheDocument();
});
