import React, { useEffect } from 'react';
import { useMutation } from "@apollo/client";

import ADD_PLAN, { updateCache } from '../graphql/AddPlan';
import getPlan from '../graphql/GetPlan';
import isoDate from '../lib/date';
import { PlanWorkspace } from '../components/PlanWorkspace';
import HandleQuery from '../components/HandleQuery';

const EnsurePlanExists = ({ data }) => {
  const [mutatePlan, mutationResult] = useMutation(ADD_PLAN);
  const planExists = data.plans.length > 0;

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

  if (mutationResult.data) {
    return <PlanWorkspace plan={mutationResult.data.plans} />;
  }

  if (planExists) {
    return <PlanWorkspace plan={data.plans[0]} />;
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
