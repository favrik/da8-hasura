import React, { useEffect } from 'react';
import ADD_PLAN from '../graphql/AddPlan';
import getPlan from '../graphql/GetPlan';
import isoDate from '../lib/date';
import { useMutation } from "@apollo/client";
import { Now } from '../components/Now';
import HandleQuery from '../components/HandleQuery';

const EnsurePlanExists = ({ data }) => {
  const [mutatePlan, { loading, mutationData }] = useMutation(ADD_PLAN);
  const planExists = data.plans.length > 0;

  if (planExists) {
    return <Now plans={data.plans} />;
  }

  useEffect(() => {
    mutatePlan({ variables: { object: { today: isoDate() } } });
  }, [mutatePlan]);

  if (loading) {
    return '<div> Loading</div>';
  }

  if (mutationData) {
    return <Now plans={mutationData.plans} />;
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
