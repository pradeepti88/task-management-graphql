import React, { useState, useMemo, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_TASK, DELETE_TASK } from '../graphql/mutation';
import {
  IconButton,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank as CheckBoxBlank, Delete, Edit } from '@mui/icons-material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  border: '2px solid gray',
  borderRadius: 5,
  boxShadow: 24,
  py: 3,
  px: 4,
};

/**
 * Component to display a single task item and modal to update a task
 *
 * @param {Number} id task unique id
 * @param {String} title title of the task
 * @param {Enum} status Task is either completed or not
 * @param {Function} onTaskReload to reload all tasks
 */
const TaskItem = ({ id, title, status, onTaskReload }) => {
  const [taskStatus, setTaskStatus] = useState(status);
  const [taskTitle, setTaskTitle] = useState(title);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const matchBreakPoint = useMediaQuery('(min-width:600px)');

  useEffect(() => {
    updateTask();
  }, [taskStatus]);

  const [updateTask] = useMutation(UPDATE_TASK, {
    variables: {
      id: id,
      taskStatus: taskStatus,
      taskTitle: taskTitle,
    },
    onCompleted: () => {
      onTaskReload();
      setShowTaskModal(false);
    },
  });
  const [deletingTask] = useMutation(DELETE_TASK, {
    variables: {
      id: id,
    },
    onCompleted: () => {
      onTaskReload();
      setShowTaskModal(false);
    },
  });
  const renderCheckboxIcon = () => {
    if (taskStatus === 'DONE') {
      // Task completed - render green check box
      return <CheckBox style={{ color: 'green' }} fontSize="large" onClick={() => setTaskStatus('TODO')} />;
    }
    // By default render unchecked icon
    return <CheckBoxBlank fontSize="large" onClick={() => setTaskStatus('DONE')} />;
  };

  return useMemo(() => {
    return (
      <>
        <ListItem sx={{ backgroundColor: '#ced6d6', marginBottom: 2, borderRadius: 5 }} data-testid="task-item">
          <IconButton edge="start">{renderCheckboxIcon()}</IconButton>
          <ListItemText
            primary={title}
            style={{ maxWidth: 'fit-content' }}
            primaryTypographyProps={{
              paddingRight: 5,
            }}
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="edit the task"
              onClick={() => setShowTaskModal(true)}
              data-testid="edit-button"
            >
              <Edit fontSize="large" />
            </IconButton>
            <IconButton edge="end" aria-label="delete the task" onClick={deletingTask} data-testid="delete-button">
              <Delete fontSize="large" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Modal
          open={showTaskModal}
          onClose={() => setShowTaskModal(false)}
          aria-labelledby="Update task"
          aria-describedby="Update task"
        >
          <Box sx={{ ...modalStyle, width: matchBreakPoint ? 500 : '70%' }} justifyContent="space-between" spacing={3}>
            <Typography variant="h6" mb={5}>
              Update the task
            </Typography>

            <TextField
              placeholder="Add New Task"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              id="outlined-basic"
              label="Task title"
              variant="outlined"
              required
              fullWidth
            />
            <Stack direction="row" spacing={2} marginTop={5} justifyContent="center">
              <Button variant="contained" onClick={updateTask}>
                Edit
              </Button>
              <Button variant="outlined" color="error" onClick={deletingTask}>
                Delete
              </Button>
              <Button variant="outlined" onClick={() => setShowTaskModal(false)}>
                Cancel
              </Button>
            </Stack>
          </Box>
        </Modal>
      </>
    );
  }, [taskStatus, showTaskModal, taskTitle, matchBreakPoint]);
};

export default TaskItem;
