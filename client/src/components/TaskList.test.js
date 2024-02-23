/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TaskList from './TaskList';
import { mocks } from '../mocks/getTasks';
import { TaskContext } from '../taskContext';

jest.mock('./AddTask', () => () => <div>Add task</div>);
jest.mock('./TaskItem', () => () => <div>Task item</div>);

it('renders no tasks message when there are no tasks', () => {
  render(
    <TaskContext.Provider value={[[], () => {}]}>
      <TaskList reload={() => {}} />
    </TaskContext.Provider>,
  );
  expect(screen.getByText('No tasks to display')).toBeInTheDocument();
});

const tasksSet = mocks[0].result.data.tasks;
it('renders taskItem component when there are tasks', () => {
  render(
    <TaskContext.Provider value={[tasksSet, () => {}]}>
      <TaskList reload={() => {}} />
    </TaskContext.Provider>,
  );
  expect(screen.getByText('Task item')).toBeInTheDocument();
});
