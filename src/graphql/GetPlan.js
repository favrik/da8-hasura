import { useQuery, gql } from "@apollo/client";
import isoDate from '../lib/date';

const GET_PLAN = gql`
query GetPlan($today: date) {
  plans(where: {today: {_eq: $today}}) {
    today
    id
    tasks(order_by: { id: asc }) {
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

const getPlan = (date = isoDate()) => {
  return useQuery(
    GET_PLAN,
    {
      variables: { today: date }
    }
  );
};

export { GET_PLAN, getPlan as default };
