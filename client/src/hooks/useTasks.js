import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import { GET_TASKS } from '../graphql/query';
import { GET_FILTERED_TASKS } from '../graphql/filterQuery';
import { TaskContext } from '../taskContext';

export default function useTasks({ filter }) {
  const [tasks, setTasks] = useContext(TaskContext);
  const queryType = filter ? GET_FILTERED_TASKS : GET_TASKS;
  const { loading, error, data, refetch } = useQuery(queryType);
  const allTasks = data ? data.tasks : [];
  setTasks(allTasks);
  return { allTasks, loading, error, refetch };
}
