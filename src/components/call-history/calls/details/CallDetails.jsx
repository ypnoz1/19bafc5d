import { useEffect, useState } from "react";
import AxiosInstance, { baseApiUrl } from "../../../../api/AxiosInstance.js";
import { getHumanTimeFromSeconds } from "../../../../utils/Time.utils.jsx";
import { formatPhoneNumber } from "../../../../utils/Phone.utils.jsx";
import LoaderDots from "../../../loader/dots/LoaderDots.jsx";
import "./CallDetails.css";

const CallDetails = ({ open, idCall }) => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [id, setId] = useState("");

  const infoToDisplay = [
    { id: 1, label: "Duration", key: "duration" },
    { id: 2, label: "Callee's number", key: "to" },
    { id: 3, label: "Aircall number", key: "via" },
  ];

  useEffect(() => {
    if (open && id !== idCall) {
      setId(idCall);
      getCallDetails();
    }
  }, [open, idCall]);

  const getCallDetails = () => {
    setLoading(true);
    AxiosInstance.get(`${baseApiUrl}/activities/${idCall}`)
      .then((res) => {
        setDetails(res);
      })
      .finally(() => setLoading(false));
  };

  const getVal = (label, val) => {
    if (label === infoToDisplay[0].label) {
      return getHumanTimeFromSeconds(val);
    } else if (label === infoToDisplay[1].label) {
      return formatPhoneNumber(val);
    } else if (label === infoToDisplay[2].label) {
      return formatPhoneNumber(val);
    }
    return val;
  };

  return open && !loading && details && Object.hasOwn(details, "duration") ? (
    <div className="cll-det-main">
      {infoToDisplay.map((i) => (
        <div key={`info-${i.id}`} className="cll-det-info">
          <div className="cll-det-lab">{i.label}:</div>
          <div className="cll-det-val">{getVal(i.label, details[i.key])}</div>
        </div>
      ))}
    </div>
  ) : (
    <>
      {open && loading && (
        <div style={{ paddingLeft: "60px", height: "56px" }}>
          <LoaderDots isSaving={loading} />
        </div>
      )}
    </>
  );
};

export default CallDetails;
