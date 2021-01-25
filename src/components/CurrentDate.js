import  { friendlyDate } from '../lib/date';

const CurrentDate = ({ plan }) => {
  return (
    <div className="plan-date">
      {friendlyDate(plan.today)}
    </div>
  );
};

export { CurrentDate as default };
