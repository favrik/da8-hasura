import React, { useEffect } from 'react';
import ADD_PLAN, { updateCache } from '../graphql/AddPlan';
import getPlan, { GET_PLAN } from '../graphql/GetPlan';
import isoDate from '../lib/date';
import { useMutation } from "@apollo/client";
import { Now } from '../components/Now';
import HandleQuery from '../components/HandleQuery';

const EnsurePlanExists = ({ data }) => {
  const [mutatePlan, mutationResult] = useMutation(ADD_PLAN);
  const planExists = data.plans.length > 0;

  console.log(planExists);
  useEffect(() => {
    if (!planExists) {
      mutatePlan({
        variables: {
          object: { today: isoDate() }
        },
        update: updateCache
      });
    }
  }, [mutatePlan]);


  if (mutationResult.loading) {
    return '<div> Loading</div>';
  }

  console.log(mutationResult);
  if (mutationResult.data) {
    return <Now plans={[mutationResult.data.plans]} />;
  }

  if (planExists) {
    return (
      <Now plans={data.plans} />
    );
  }

  return null;
};

const EnsurePlanExistsQuery = (props) => {
  return (
    <HandleQuery query={getPlan()}>
      {(data) => (<EnsurePlanExists data={data} />)}
    </HandleQuery>
  );
};

export { EnsurePlanExistsQuery as default, EnsurePlanExists };
