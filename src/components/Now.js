import React, { useState, useCallback, useRef, useEffect } from 'react';
import TaskLevelSelector from './TaskLevelSelector';
import TaskDisplay from './TaskDisplay';
import KeyboardHelper from './KeyboardHelper';
import DA8, { itemNavigator } from '../lib/DA8';
import { useQuery } from "@apollo/client";
import { GET_PLAN } from '../graphql/GetPlan';

const Now = (props) => {
  const { todos } = props;

  return (
    <div></div>
  );
};

const NowQuery = () => {
  const { loading, error, data } = useQuery(GET_PLAN, { variables: { today: '2021-01-17' } });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  return <Now todos={data.plans} />;
};

export { Now, NowQuery as default };
