import { CREATE_TASK } from '../graphql/mutation';

export const errorCreateMock = [
  {
    request: {
      query: CREATE_TASK,
      variables: { title: 'New task' },
    },
    error: new Error('An error occurred'),
  },
];
export const createMocks = [
  {
    request: {
      query: CREATE_TASK,
      variables: {
        title: 'New task',
      },
    },
    result: {
      data: {
        task: {
          title: 'New task',
          id: '65d69631ecadac8bc57779e0',
          dueDate: '2024-02-23T00:00:00.000Z',
          status: 'TODO',
        },
      },
    },
    maxUsageCount: 5,
  },
];
