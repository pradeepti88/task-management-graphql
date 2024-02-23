import { GET_TASKS } from '../graphql/query';

export const errorMock = [
  {
    request: {
      query: GET_TASKS,
    },
    error: new Error('An error occurred'),
  },
];
export const mocks = [
  {
    request: {
      query: GET_TASKS,
    },
    result: {
      data: {
        tasks: [
          {
            title: 'New task added',
            id: '65d69631ecadac8bc57779e0',
            dueDate: '2024-02-23T00:00:00.000Z',
            status: 'TODO',
          },
        ],
      },
    },
    maxUsageCount: 5,
  },
];
