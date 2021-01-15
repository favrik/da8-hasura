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

const variables = () => { variables: { today: isoDate() } };

const getPlan = () => useQuery(GET_PLAN, variables);


export { GET_PLAN, variables };
export default getPlan;
