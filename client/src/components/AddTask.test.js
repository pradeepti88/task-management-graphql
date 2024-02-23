import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import AddTask from './AddTask';
import { createMocks, errorCreateMock } from '../mocks/createTasks';

it('should call reload method on successful task creation', async () => {
  const reload = jest.fn();

  render(
    <MockedProvider mocks={createMocks} addTypename={false}>
      <AddTask taskReload={reload} />
    </MockedProvider>,
  );
  const input = screen.getByPlaceholderText('Add New Task');
  const value = 'New task';
  fireEvent.change(input, {
    target: {
      value,
    },
  });
  expect(input).toHaveValue('New task');
  const createTaskButton = await screen.findByTestId('create-task');
  userEvent.click(createTaskButton);
  await waitFor(() => {
    expect(reload).toHaveBeenCalled();
  });
});

it('should not call reload method on if task creation throws an error', async () => {
  const reload = jest.fn();

  render(
    <MockedProvider mocks={errorCreateMock} addTypename={false}>
      <AddTask taskReload={reload} />
    </MockedProvider>,
  );
  const input = screen.getByPlaceholderText('Add New Task');
  const value = 'New task';
  fireEvent.change(input, {
    target: {
      value,
    },
  });
  expect(input).toHaveValue('New task');
  const createTaskButton = await screen.findByTestId('create-task');
  userEvent.click(createTaskButton);
  await waitFor(() => {
    expect(reload).not.toHaveBeenCalled();
  });
});
