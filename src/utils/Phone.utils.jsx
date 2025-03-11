import moment from "moment";
import PhoneCallbackOutlinedIcon from "@mui/icons-material/PhoneCallbackOutlined";
import PhoneMissedOutlinedIcon from "@mui/icons-material/PhoneMissedOutlined";
import VoicemailOutlinedIcon from "@mui/icons-material/VoicemailOutlined";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import CallReceivedOutlinedIcon from "@mui/icons-material/CallReceivedOutlined";
import { listContacts } from "../constants/contacts.jsx";
import { PhoneLabel } from "../constants/phoneText.jsx";

export const formatPhoneNumber = (phoneNumberString) => {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = match[1] ? "+1 " : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }
  return phoneNumberString;
};

export const getCaller = (from) => {
  const found = listContacts.find((c) => c.id === from);
  if (found) return `${found.fName} ${found.lName}`;
  return formatPhoneNumber(from);
};

export const callTypeIcon = (callType) => {
  let icon = <VoicemailOutlinedIcon />;
  if (callType === PhoneLabel.MISSED) {
    icon = <PhoneMissedOutlinedIcon />;
  } else if (callType === PhoneLabel.ANSWERED) {
    icon = <PhoneCallbackOutlinedIcon />;
  }
  return <div id="cll-icn-elem">{icon}</div>;
};

export const callDirectionFormat = (direction) =>
  direction === PhoneLabel.INBOUND
    ? PhoneLabel.INCOMING_CALL
    : PhoneLabel.OUTGOING_CALL;

export const callDirectionIcon = (direction, callType) => {
  const color = callType === PhoneLabel.ANSWERED ? {} : { color: "#C64646" };
  const icon =
    direction === PhoneLabel.INBOUND ? (
      <CallReceivedOutlinedIcon sx={{ fontSize: "14px", ...color }} />
    ) : (
      <CallMadeOutlinedIcon sx={{ fontSize: "14px", ...color }} />
    );
  return icon;
};

export const groupCallsByDate = (callHistory) => {
  const groupedCalls = {};
  callHistory.forEach((c) => {
    const keyDate = moment(c.created_at).format("YYYY-MM-DD");
    if (Object.hasOwn(groupedCalls, keyDate)) {
      const foundIndex = groupedCalls[keyDate].findIndex(
        (call) => call.from === c.from
      );
      if (foundIndex >= 0) {
        groupedCalls[keyDate][foundIndex] = {
          ...groupedCalls[keyDate][foundIndex],
          idLogs: [...(groupedCalls[keyDate][foundIndex]?.idLogs ?? []), c.id],
          callTypeLogs: [
            ...(groupedCalls[keyDate][foundIndex]?.callTypeLogs ?? []),
            c.call_type,
          ],
          createdLogs: [
            ...(groupedCalls[keyDate][foundIndex]?.createdLogs ?? []),
            c.created_at,
          ],
          directionLogs: [
            ...(groupedCalls[keyDate][foundIndex]?.directionLogs ?? []),
            c.direction,
          ],
          durationLogs: [
            ...(groupedCalls[keyDate][foundIndex]?.durationLogs ?? []),
            c.duration,
          ],
          fromLogs: [
            ...(groupedCalls[keyDate][foundIndex]?.fromLogs ?? []),
            c.from,
          ],
          toLogs: [...(groupedCalls[keyDate][foundIndex]?.toLogs ?? []), c.to],
          viaLogs: [
            ...(groupedCalls[keyDate][foundIndex]?.viaLogs ?? []),
            c.via,
          ],
        };
      } else {
        groupedCalls[keyDate].push(c);
      }
    } else {
      groupedCalls[keyDate] = [
        {
          ...c,
        },
      ];
    }
  });
  return groupedCalls;
};
