import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import TaskContainer from './TaskContainer';
import { errorMock, mocks } from '../mocks/getTasks';
import { TaskContext } from '../taskContext';

it('renders with error', async () => {
  render(
    <MockedProvider mocks={errorMock} addTypename={false}>
      <TaskContext.Provider value={['', () => {}]}>
        <TaskContainer />
      </TaskContext.Provider>
    </MockedProvider>,
  );
  expect(await screen.findByText('Error : An error occurred')).toBeInTheDocument();
});
it('renders without error', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TaskContext.Provider value={['', () => {}]}>
        <TaskContainer />
      </TaskContext.Provider>
    </MockedProvider>,
  );
  expect(await screen.findByText('Loading...')).toBeInTheDocument();
});
it('renders TaskList component without any error', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TaskContext.Provider value={['', () => {}]}>
        <TaskContainer />
      </TaskContext.Provider>
    </MockedProvider>,
  );
  expect(await screen.findByText('Loading...')).toBeInTheDocument();
  expect(await screen.findByText('All Tasks')).toBeInTheDocument();
});
