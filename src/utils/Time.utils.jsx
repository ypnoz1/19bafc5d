import moment from "moment";
export const getHourMinuteFromDate = (dateTime) =>
  moment(dateTime).format("hh:mm A");

export const getHumanTimeFromSeconds = (seconds) => {
  const date = new Date(null);
  date.setSeconds(seconds);
  const result = date.toISOString().slice(11, 19);
  return result;
};
