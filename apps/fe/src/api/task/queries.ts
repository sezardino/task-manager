export const CREATE_TASK_QUERY = `
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
    }
  }
`;

export const PROJECT_TASKS_QUERY = `
  mutation Tasks($input: TasksListInput!) {
    tasks(input: $input) {
      id
      title
      status
      assignee {
        email
        firstName
        lastName
      }
    }
  }
`;

export const PROJECT_TASK_QUERY = `
  mutation Task($input: OneTaskInput!) {
    task(input: $input) {
      id
      title
      description
      status
      assignee {
        email
        firstName
        lastName
      }
    }
  }
`;

export const UPDATE_TASK_QUERY = `
  mutation updateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      title
    }
  }
`;
