import React from 'react';

const TaskContext = React.createContext();

const TaskProvider = TaskContext.Provider;
const TaskConsumer = TaskContext.Consumer;

export { TaskContext, TaskProvider, TaskConsumer };
