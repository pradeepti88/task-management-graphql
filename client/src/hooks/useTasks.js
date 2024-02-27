import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { GET_FILTERED_TASKS } from "../graphql/filterQuery";
import { TaskContext } from "../taskContext";

export default function useTasks(filter = true) {
  const [tasks, setTasks] = useContext(TaskContext);
  const [filterOption, setFilterOption] = useState();

  const { loading, error, data, refetch } = useQuery(GET_FILTERED_TASKS, {
    variables: {
      filter: filterOption,
      fetchPolicy: "no-cache",
    },
    skip: filter,
  });
  const filterTasks = (filterSelected) => {
    setFilterOption(filterSelected);
    refetch({
      variables: {
        filter: filterSelected,
      },
    });
  };
  data && setTasks(data.tasks);
  return { tasks, loading, error, filterTasks, refetch };
}
