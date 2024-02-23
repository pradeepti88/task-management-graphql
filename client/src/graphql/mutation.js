import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
    mutation createTask($title: String!){
      createTask(
        input: {
          title: $title
          status: TODO
          dueDate: "${new Date(new Date().setDate(new Date().getDate() + 3))}"
        }
      ) {
        id
        title
        status
      }
    }
  `;

export const UPDATE_TASK = gql`
  mutation ($id: ID!, $taskStatus: Status, $taskTitle: String) {
    updateTask(id: $id, status: $taskStatus, title: $taskTitle) {
      id
      title
      description
      status
      dueDate
    }
  }
`;

export const DELETE_TASK = gql`
  mutation ($id: ID!) {
    deleteTask(id: $id)
  }
`;
