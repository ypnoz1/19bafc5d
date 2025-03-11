import { getHourMinuteFromDate } from "../../../../utils/Time.utils.jsx";

const CallTime = ({ call, callBackSelectedCall }) => {
  return (
    <div
      className="cll-elem-txt-time"
      onClick={() => callBackSelectedCall(call.id)}
    >
      {getHourMinuteFromDate(call.created_at)}
    </div>
  );
};

export default CallTime;
