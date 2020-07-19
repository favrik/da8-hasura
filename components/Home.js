import { useQuery } from "@apollo/react-hooks";
import gql from 'graphql-tag';
import isoDate from '../lib/date';
import HandleQuery from './HandleQuery';
import Today from './Today';

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

const Home = () => {
  const { loading, error, data } = useQuery(GET_PLAN, { variables: { today: isoDate() } });

  return (
    <HandleQuery loading={loading} error={error}>
      <Today data={data} />
    </HandleQuery>
  );
};

export default Home;
