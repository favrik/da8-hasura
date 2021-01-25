import { gql } from '@apollo/client';

const ADD_PLAN = gql`
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
      level
      completed
      created_at
      description
      id
      plan_id
      updated_at
    }
  }
}
`;

export { ADD_PLAN as default };
