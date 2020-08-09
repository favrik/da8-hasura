import { useQuery } from "@apollo/react-hooks";
import gql from 'graphql-tag';
import isoDate from '../lib/date';

const GET_PLAN = gql`
query GetPlan($today: date) {
  plans(where: {today: {_eq: $today}}) {
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

const getPlan = () => useQuery(GET_PLAN, { variables: { today: isoDate() } });

export default getPlan;