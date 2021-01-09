import React, { useState, useEffect } from 'react';
import Today from '../components/Today';
import AddPlanQuery from '../graphql/AddPlan';
import isoDate from '../lib/date';
import { useMutation } from "@apollo/client";

const EnsurePlanExists = (props) => {
  const [plan, setPlan] = useState(props.data);
  const [mutatePlan, { loading, data }] = useMutation(AddPlanQuery);
  const planExists = props.data.plans.length > 0;

  if (planExists) {
    return <Today initialPlan={props.data} />;
  }

  useEffect(() => {
    mutatePlan({ variables: { object: { today: isoDate() } } });
  }, [mutatePlan]);

  if (loading) {
    return '<div> Loading</div>';
  }

  if (data) {
    const plans = { plans: [data.plans] }
    return <Today initialPlan={plans} />;
  }

  return null;
};

export default EnsurePlanExists;
