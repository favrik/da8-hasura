import { useQuery } from "@apollo/react-hooks";
import gql from 'graphql-tag';
import isoDate from '../lib/date';

const GET_PLAN = gql`
query GetPlan($today: date) {
  plans(where: {today: {_eq: $today}}) {
    today
    id
    tasks {
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

const Plan = () => {
  const { loading, error, data } = useQuery(GET_PLAN, { variables: { today: isoDate() } });
  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    console.log(error);
    return <div>Error</div>;
  }



  return <div>{JSON.stringify(data)}</div>
};

export default Plan;
