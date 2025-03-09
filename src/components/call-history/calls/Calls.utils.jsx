import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

export const isSelected = (idCall, callToArchive) =>
  callToArchive.includes(idCall);

export const isSelectedAll = (countSelected, callHistory) =>
  countSelected ===
  Object.keys(callHistory).reduce(
    (accumulator, key) => accumulator + callHistory[key].length,
    0
  );

export const toggleCheckBoxUtils = (
  idCall,
  idLogs,
  countSelected,
  callToArchive,
  setCountSelected,
  setCallToArchive
) => {
  if (!isSelected(idCall, callToArchive)) {
    setCountSelected(countSelected + 1);
    setCallToArchive([...callToArchive, ...idLogs, idCall]);
  } else {
    const index = callToArchive.indexOf(idCall);
    if (index > -1) {
      const copyArray = [...callToArchive];
      copyArray.splice(index, 1);
      idLogs.forEach((id) => {
        const index = callToArchive.indexOf(id);
        if (index > -1) {
          copyArray.splice(index, 1);
        }
      });
      setCallToArchive(copyArray);
      setCountSelected(countSelected - 1);
    }
  }
};

export const selectAll = (callHistory, setCallToArchive, setCountSelected) => {
  let count = 0;
  const selection = [];
  Object.keys(callHistory).forEach((key) =>
    callHistory[key].forEach((call) => {
      count++;
      selection.push(call.id);
      if (Object.hasOwn(call, "idLogs")) {
        call.idLogs.forEach((id) => selection.push(id));
      }
    })
  );
  setCallToArchive(selection);
  setCountSelected(count);
};

export const checkBoxIconStyle = (idCall, callToArchive) => {
  if (!isSelected(idCall, callToArchive)) {
    return <CheckBoxOutlineBlankOutlinedIcon />;
  }
  return <CheckBoxOutlinedIcon />;
};

export const hasData = (callHistory) => Object.keys(callHistory).length > 0;
