import React, { useState, useEffect } from 'react';
import addPlan from '../graphql/AddPlan';
import Today from '../components/Today';


const EnsurePlanExists = (props) => {
  const [plan, setPlan] = useState(props.data);
  const [mutatePlan, {loading, data, error}] = addPlan();
  const planExists = props.data['plans'].length > 0;

  if (planExists) {
    return <Today data={props.data} />;
  }

  useEffect(() => {
    const newPlan = mutatePlan();
    newPlan.then(response => (console.log(response)));


  }, [plan]);

  return (
    <Today data={plan} />
  );
};

export default EnsurePlanExists;
