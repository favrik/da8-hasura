// /plan page ;)
import HandleQuery from '../components/HandleQuery';
import EnsurePlanExists from '../components/EnsurePlanExists';
import getPlan from '../graphql/GetPlan';
import Today from '../components/Today';
import Now from '../components/Now';


export default function Index() {
  return (
    <Now />
  );
};
