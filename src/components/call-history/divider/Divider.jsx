import moment from "moment";
import "./Divider.css";

const Divider = ({ label }) => {
  const isSameDay = (dateLabel) => {
    const start = moment(dateLabel);
    const end = moment();
    const sameDate = end.diff(start, "days") === 0;
    return sameDate;
  };

  return isSameDay(label) ? null : (
    <div className="dvder-main">
      <div className="dvder-sides">
        <div className="dvder-dots"></div>
      </div>
      <div className="dvder-label">{moment(label).format("MMMM DD, YYYY")}</div>
      <div className="dvder-sides">
        <div className="dvder-dots"></div>
      </div>
    </div>
  );
};

export default Divider;
