import { gql } from '@apollo/client';

export const GET_FILTERED_TASKS = gql`
  query ($filter: String) {
    tasks(filter: { status: $filter }) {
      title
      id
      status
    }
  }
`;
