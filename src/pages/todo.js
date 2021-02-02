import HandleQuery from '../components/HandleQuery';
import EnsurePlanExists from '../components/EnsurePlanExists';
import getPlan from '../graphql/GetPlan';


export default function Index() {
  return (
    <HandleQuery query={getPlan()}>
      <EnsurePlanExists data={data} />
    </HandleQuery>
  );
};
