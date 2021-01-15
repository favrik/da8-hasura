import { useMutation, gql } from "@apollo/client";
import { GET_PLAN } from './GetPlan';

const ADD_TASK = gql`
mutation AddTask($description: String!, $level: bpchar!, $plan_id: Int!) {
  insert_tasks_one(
    object: { description: $description, level: $level, plan_id: $plan_id }
  ) {
    id
    plan_id
    description
    level
  }
}
`;

const addTask = () => useMutation(
  ADD_TASK, {
    update: (proxy, { data: { insert_tasks_one } }) => {
      const data = proxy.readQuery({ query: GET_PLAN });

      const newTasks = [ ...data.plans[0].tasks, insert_tasks_one ];

      proxy.writeQuery({ query: GET_PLAN, data: {
        plans: [
          { ...data.plans[0], ...{ tasks: newTasks } }
        ]
      }});
    }
  }
);

export default addTask;
