import React, { useState, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ListItem, TextField, IconButton, Typography } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { CREATE_TASK } from '../graphql/mutation';
/**
 * Creates new task
 *
 * @param {Function} taskReload function to reload tasks when a new task is added
 */
const AddTask = ({ taskReload }) => {
  const [inputText, setInputText] = useState('');
  const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
    variables: {
      title: inputText,
    },
    onCompleted: taskReload,
  });
  const inputElement = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    createTask();
    setInputText('');
    inputElement.current.focus();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <Typography variant="h6" align="center">
        Add a new task
      </Typography>
      <ListItem component="form" onSubmit={onSubmit} data-testid="add-task-form">
        <TextField
          ref={inputElement}
          placeholder="Add New Task"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          id="outlined-basic"
          label="Task title"
          variant="outlined"
          required
          fullWidth
        />
        <IconButton edge="end" aria-label="create new task" type="submit" data-testid="create-task">
          <AddCircle color="primary" fontSize="large" />
        </IconButton>
      </ListItem>
    </>
  );
};

export default AddTask;
