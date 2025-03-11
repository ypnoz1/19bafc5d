import { isSelected, checkBoxIconStyle } from "../Calls.utils.jsx";
import { callTypeIcon } from "../../../../utils/Phone.utils.jsx";
const CallAvatar = ({ call, callToArchive, toggleCheckBox }) => {
  return (
    <div
      className="cll-elem-icn"
      onClick={() =>
        toggleCheckBox(
          call.id,
          call && Object.hasOwn(call, "idLogs") ? call.idLogs : []
        )
      }
    >
      {!isSelected(call.id, callToArchive) && callTypeIcon(call.call_type)}
      <div
        id="cll-selector-elem"
        style={isSelected(call.id, callToArchive) ? { display: "flex" } : {}}
      >
        {checkBoxIconStyle(call.id, callToArchive)}
      </div>
    </div>
  );
};

export default CallAvatar;
