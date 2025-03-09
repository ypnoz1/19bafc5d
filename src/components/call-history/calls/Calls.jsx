import { useState, useEffect, Fragment, useContext } from "react";
import AxiosInstance, { baseApiUrl } from "../../../api/AxiosInstance.js";
import Divider from "../divider/Divider.jsx";
import Archiver from "../archiver/Archiver.jsx";
import LoaderWaves from "../../loader/waves/LoaderWaves.jsx";
import MenuContext from "../../../context/menu/MenuContext.jsx";
import AlertNoData from "../../alert/no-data/AlertNoData.jsx";
import CallDetails from "./details/CallDetails.jsx";
import {
  getCaller,
  groupCallsByDate,
  callTypeIcon,
  callDirectionIcon,
  callDirectionFormat,
} from "../../../utils/Phone.utils.jsx";
import { getHourMinuteFromDate } from "../../../utils/Time.utils.jsx";
import { MenuLabel } from "../../../constants/menu.jsx";
import {
  isSelected,
  isSelectedAll,
  toggleCheckBoxUtils,
  selectAll,
  checkBoxIconStyle,
  hasData,
} from "./Calls.utils.jsx";
import "./Calls.css";

const Calls = () => {
  const [countSelected, setCountSelected] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [callHistory, setCallHistory] = useState([]);
  const [callToArchive, setCallToArchive] = useState([]);
  const [callDetails, setCallDetails] = useState("");
  const { activeLabel } = useContext(MenuContext);

  useEffect(() => {
    if (isLoading) {
      getListCalls();
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
    }
  }, [activeLabel]);

  const getListCalls = () => {
    setCountSelected(0);
    setCallToArchive([]);
    setCallHistory([]);
    AxiosInstance.get(`${baseApiUrl}/activities`).then((res) => {
      const archived = activeLabel === MenuLabel.ARCHIVE;
      const filterResult = res.filter((r) => r.is_archived === archived);
      filterResult.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setCallHistory(groupCallsByDate(filterResult));
      setIsLoading(false);
    });
  };

  const toggleCheckBox = (idCall, idLogs) =>
    toggleCheckBoxUtils(
      idCall,
      idLogs,
      countSelected,
      callToArchive,
      setCountSelected,
      setCallToArchive
    );

  return (
    <>
      <Archiver
        countSelected={countSelected}
        isSelectedAll={isSelectedAll(countSelected, callHistory)}
        callToArchive={callToArchive}
        callBackToggleSelectAll={() => {
          if (isSelectedAll(countSelected, callHistory)) {
            setCallToArchive([]);
            setCountSelected(0);
          } else {
            selectAll(callHistory, setCallToArchive, setCountSelected);
          }
        }}
        callBackRefresh={() => setIsLoading(true)}
      />
      <div
        className="cll-main"
        style={!hasData(callHistory) ? { height: "calc(100% - 15px)" } : {}}
      >
        {isLoading && <LoaderWaves />}
        {!isLoading && (
          <>
            {!hasData(callHistory) && <AlertNoData />}
            {hasData(callHistory) && (
              <>
                {Object.keys(callHistory).map((key) => {
                  return callHistory[key].map((call, index) => {
                    return (
                      <Fragment key={`call-${call.id}`}>
                        {index === 0 && <Divider label={key} />}
                        <div className="cll-elems">
                          <div className="cll-elem">
                            <div
                              className="cll-elem-icn"
                              onClick={() =>
                                toggleCheckBox(
                                  call.id,
                                  Object.hasOwn(call, "idLogs")
                                    ? call.idLogs
                                    : []
                                )
                              }
                            >
                              {!isSelected(call.id, callToArchive) &&
                                callTypeIcon(call.call_type)}
                              <div
                                id="cll-selector-elem"
                                style={
                                  isSelected(call.id, callToArchive)
                                    ? { display: "flex" }
                                    : {}
                                }
                              >
                                {checkBoxIconStyle(call.id, callToArchive)}
                              </div>
                            </div>
                            <div
                              className="cll-elem-txt"
                              onClick={() => {
                                setCallDetails(
                                  callDetails === call.id ? "" : call.id
                                );
                              }}
                            >
                              <div className="cll-elem-txt-cller">
                                {getCaller(call.from)}
                                {Object.hasOwn(call, "fromLogs") && (
                                  <div className="cll-elem-txt-cller-count">
                                    {call.fromLogs.length + 1}
                                  </div>
                                )}
                              </div>
                              <div className="cll-elem-txt-type">
                                {callDirectionIcon(
                                  call.direction,
                                  call.call_type
                                )}
                                <span>
                                  {callDirectionFormat(call.direction)}
                                </span>
                              </div>
                            </div>
                            <div
                              className="cll-elem-txt-time"
                              onClick={() => {
                                setCallDetails(
                                  callDetails === call.id ? "" : call.id
                                );
                              }}
                            >
                              {getHourMinuteFromDate(call.created_at)}
                            </div>
                          </div>
                          <CallDetails
                            open={callDetails === call.id}
                            idCall={call.id}
                          />
                        </div>
                      </Fragment>
                    );
                  });
                })}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Calls;
