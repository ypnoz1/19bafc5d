import {
  getCaller,
  callDirectionIcon,
  callDirectionFormat,
} from "../../../../utils/Phone.utils.jsx";

const CallInfo = ({ call, callBackSelectedCall }) => {
  return (
    <div className="cll-elem-txt" onClick={() => callBackSelectedCall(call.id)}>
      <div className="cll-elem-txt-cller">
        {getCaller(call.from)}
        {Object.hasOwn(call, "fromLogs") && (
          <div className="cll-elem-txt-cller-count">
            {call.fromLogs.length + 1}
          </div>
        )}
      </div>
      <div className="cll-elem-txt-type">
        {callDirectionIcon(call.direction, call.call_type)}
        <span>{callDirectionFormat(call.direction)}</span>
      </div>
    </div>
  );
};

export default CallInfo;
