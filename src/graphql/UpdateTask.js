import { useMutation, gql } from "@apollo/client";
import { GET_PLAN } from './GetPlan';

const UPDATE_TASK = gql`
mutation UpdateTask($id: Int!, $description: String!, $level: String!, $plan_id: Int!) {
  update_tasks_by_pk(
    pk_columns: { id: $id }
    _set: { description: $description }
  ) {
    id
    plan_id
    description
    level
  }
}
`;

const updateTask = () => useMutation(
  UPDATE_TASK,
  {
  }
);

const updateTaskCache = (submitted) => {
  return (proxy) => {
    const data = proxy.readQuery({ query: GET_PLAN });

    const newTasks = data.plans[0].tasks.map(t => {
      if (t.id === submitted.id) {
        return { ...t, description: submitted.description };
      }
      return t;
    });

    proxy.writeQuery({ query: GET_PLAN, data: {
      plans: [
        { ...data.plans[0], ...{ tasks: newTasks } }
      ]
    }});
  };
};

export { updateTask as default, updateTaskCache };
