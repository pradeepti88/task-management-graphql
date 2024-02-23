import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import TaskItem from './TaskItem';
import { DELETE_TASK, UPDATE_TASK } from '../graphql/mutation';

const taskItem = { title: 'Task title', status: 'DONE', id: 1 };
const { id, title, status } = taskItem;
const mocks = [
  {
    request: {
      query: DELETE_TASK,
      variables: { id: 1 },
    },
    result: { data: { title: null } },
  },
  {
    request: {
      query: UPDATE_TASK,
      variables: { id: 1, taskTitle: 'Task title', taskStatus: 'DONE' },
    },
    result: { data: taskItem },
  },
];
it('should render without error', async () => {
  const reload = jest.fn();

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TaskItem id={id} title={title} status={status} onTaskReload={reload} />
    </MockedProvider>,
  );

  const deleteButton = await screen.findByTestId('delete-button');
  userEvent.click(deleteButton);
  await waitFor(() => {
    expect(reload).toHaveBeenCalled();
  });
  // expect(await screen.findByText('New task')).not.toBeInTheDocument();
});

it('should render modal without error when edit button is clicked', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TaskItem id={id} title={title} status={status} onTaskReload={() => {}} />
    </MockedProvider>,
  );
  // Find the button element...
  const editButton = await screen.findByTestId('edit-button');
  userEvent.click(editButton); // Simulate a click and fire the mutation
  expect(await screen.findByText('Update the task')).toBeInTheDocument();
});
