import React from "react";
import List from "@mui/material/List";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Inbox, Done, ListAlt } from "@mui/icons-material";
import FilterLink from "./FilterLink";
import { Container, Typography } from "@mui/material";
import useTasks from "../hooks/useTasks";

/**
 * Container to render filter options
 */
const FilterList = () => {
  const matches = useMediaQuery("(min-width:600px)");
  const { filterTasks } = useTasks(true);
  const handleTaskFilter = (filterOption) => {
    // TODO :: Logic to handle graphql tasks api with filter
    filterTasks(filterOption);
  };
  return (
    <Container
      maxWidth="xs"
      sx={{
        border: "1px solid black",
        borderRadius: 5,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: "white",
        height: matches ? "80vh" : "auto",
      }}
    >
      <Typography variant="h6" align="center">
        Filter tasks by status
      </Typography>
      <List>
        <FilterLink icon={<Inbox />} onClick={() => handleTaskFilter()}>
          All
        </FilterLink>
        <FilterLink icon={<ListAlt />} onClick={() => handleTaskFilter("TODO")}>
          Active
        </FilterLink>
        <FilterLink icon={<Done />} onClick={() => handleTaskFilter("DONE")}>
          Completed
        </FilterLink>
      </List>
    </Container>
  );
};
export default FilterList;
