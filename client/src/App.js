import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Container, Typography, Grid } from '@mui/material';
import FilterList from './components/FilterList';
import TaskContainer from './components/TaskContainer';
import { TaskProvider } from './taskContext';
import { useState } from 'react';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [tasks, setTasks] = useState([]);
  return (
    <ApolloProvider client={client}>
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: '#a1c2c2',
          height: '100%',
          borderRadius: 5,
          paddingY: 3,
        }}
      >
        <TaskProvider value={[tasks, setTasks]}>
          <Grid container spacing={3} marginTop={3}>
            <Grid item={true} xs={12}>
              <Typography variant="h4" component="h1" sx={{ mb: 2 }} align="center">
                Task Management
              </Typography>
            </Grid>
            <Grid item={true} xs={12} sm={6} alignContent="center">
              <FilterList />
            </Grid>
            <Grid item={true} xs={12} sm={6} alignContent="center">
              <TaskContainer />
            </Grid>
          </Grid>
        </TaskProvider>
      </Container>
    </ApolloProvider>
  );
}

export default App;
