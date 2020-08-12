import { useMutation, gql } from '@apollo/client';
import isoDate from '../lib/date';

const AddPlanQuery = gql`
mutation UpsertPlan($object: plans_insert_input!) {
  plans: insert_plans_one(
    object: $object,
    on_conflict: {
      constraint: plans_today_key,
      update_columns: [today]
    }
  ) {
    today
    id
    tasks {
      completed
      created_at
      description
      id
      plan_id
      updated_at
      level
    }
  }
}
`;

const addPlan = () => {
  const variables = { variables: { object: { today: isoDate() } } };

  return useMutation(ADD_PLAN);
};

export default AddPlanQuery;
