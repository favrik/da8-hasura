import { useMutation, gql } from "@apollo/client";
import getPlan, { GET_PLAN, getPlanVariables} from './GetPlan';

const ADD_TASK = gql`
mutation AddTask($description: String!, $level: bpchar!, $plan_id: Int!) {
  insert_tasks_one(
    object: { description: $description, level: $level, plan_id: $plan_id }
  ) {
    level
    completed
    created_at
    description
    id
    plan_id
    updated_at
  }
}
`;

const optimisticAddTask = (task) => {
  return {
    __typename: 'Mutation',
    insert_tasks_one: {
      __typename: 'tasks',
      level: task.level,
      completed: false,
      created_at: null,
      description: task.description,
      id: Math.round(Math.random() * -1000000),
      plan_id: task.plan_id,
      updated_at: null
    }
  };
};

const updateCache = (proxy, { data: { insert_tasks_one } }) => {
  const data = proxy.readQuery({ query: GET_PLAN, variables: { today: '2021-01-17' } });
  const newTasks = [ ...data.plans[0].tasks, insert_tasks_one ];

  proxy.writeQuery({
    query: GET_PLAN,
    data: {
      plans: [
        { ...data.plans[0], ...{ tasks: newTasks } }
      ]
    },
    variables: { today: '2021-01-17' }
  });
};

export { updateCache, optimisticAddTask, ADD_TASK as default }
