import { UPDATE_TASKS } from '../graphql/mutation';

export const errorUpdateMock = [
  {
    request: {
      mutation: UPDATE_TASKS,
    },
    error: new Error('An error occurred'),
  },
];
export const updateMocks = [
  {
    request: {
      mutation: UPDATE_TASKS,
    },
    result: {
      data: {
        task: {
          title: 'New task added',
          id: '65d69631ecadac8bc57779e0',
          dueDate: '2024-02-23T00:00:00.000Z',
          status: 'TODO',
        },
      },
    },
    maxUsageCount: 5,
  },
];
