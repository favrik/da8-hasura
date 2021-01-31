import { gql } from '@apollo/client';
import { GET_PLAN } from './GetPlan';
import isoDate from '../lib/date';


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

const updateCache = (proxy, something) => {
  const currentDate = isoDate();
  const data = proxy.readQuery({ query: GET_PLAN, variables: { today: currentDate } });

  console.info('something');
  console.log(something);


  proxy.writeQuery({
    query: GET_PLAN,
    data: {
      plans: [ something.data.plans ]
    },
    variables: { today: currentDate }
  });
};


export { ADD_PLAN as default, updateCache };
