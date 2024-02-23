import React, { useContext } from 'react';
import List from '@mui/material/List';

import AddTask from './AddTask';
import TaskItem from './TaskItem';
import { Container, Typography, useMediaQuery } from '@mui/material';
import { TaskContext } from '../taskContext';

/**
 * Lists given array of tasks
 *
 * @param {Function} reload Function to refetch data from tasks api
 */
const TaskList = ({ reload }) => {
  const [tasks, setTasks] = useContext(TaskContext);
  const matches = useMediaQuery('(min-width:600px)');
  return (
    <Container
      maxWidth="xs"
      sx={{
        border: '1px solid black',
        borderRadius: 5,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'white',
        minHeight: matches ? '80vh' : 'auto',
      }}
    >
      <AddTask taskReload={reload} />
      <Typography variant="h6" align="center" sx={{ paddingTop: 2 }}>
        All Tasks
      </Typography>
      <List>
        {tasks.length !== 0 ? (
          tasks.map((task) => {
            return <TaskItem key={task.id} {...task} onTaskReload={() => reload()} />;
          })
        ) : (
          <Typography align="center">No tasks to display</Typography>
        )}
      </List>
    </Container>
  );
};
export default TaskList;
