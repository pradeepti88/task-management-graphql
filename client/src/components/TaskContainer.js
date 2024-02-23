import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import TaskList from './TaskList';
import { GET_TASKS } from '../graphql/query';
import { TaskContext } from '../taskContext';

/**
 * Container to render task data based on the response retrieved from graphql tasks api
 */
const TaskContainer = () => {
  const [tasks, setTasks] = useContext(TaskContext);
  const { loading, error, data, refetch } = useQuery(GET_TASKS);
  if (data) setTasks(data.tasks);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return <TaskList tasks={tasks} reload={refetch} />;
};

export default TaskContainer;
