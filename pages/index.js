import HandleQuery from '../components/HandleQuery';
import EnsurePlanExists from '../components/EnsurePlanExists';
import getPlan from '../graphql/GetPlan';


export default function Index() {
  const { loading, data, error } = getPlan();

  return (
    <HandleQuery loading={loading} error={error}>
      <EnsurePlanExists data={data} />
    </HandleQuery>
  );
};
