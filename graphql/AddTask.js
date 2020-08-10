import { useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag';

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
  ADD_TASK, { optimisticResponse: true }
);

export default addTask;
