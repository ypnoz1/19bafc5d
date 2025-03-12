import { useState, useEffect, Fragment, useContext } from "react";
import AxiosInstance, { baseApiUrl } from "../../../api/AxiosInstance.js";
import Divider from "../divider/Divider.jsx";
import Archiver from "../archiver/Archiver.jsx";
import LoaderWaves from "../../loader/waves/LoaderWaves.jsx";
import MenuContext from "../../../context/menu/MenuContext.jsx";
import AlertNoData from "../../alert/no-data/AlertNoData.jsx";
import CallDetails from "./details/CallDetails.jsx";
import CallAvatar from "./avatar/CallAvatar.jsx";
import CallInfo from "./info/CallInfo.jsx";
import CallTime from "./time/CallTime.jsx";
import { groupCallsByDate } from "../../../utils/Phone.utils.jsx";
import { MenuLabel } from "../../../constants/menu.jsx";
import {
  isSelectedAll,
  toggleCheckBoxUtils,
  selectAll,
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
    AxiosInstance.get(`${baseApiUrl}/activities`)
      .then((res) => {
        const archived = activeLabel === MenuLabel.ARCHIVE;
        const filterResult = res.filter((r) => r.is_archived === archived);
        filterResult.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setCallHistory(groupCallsByDate(filterResult));
      })
      .finally(() => setIsLoading(false));
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
                            <CallAvatar
                              call={call}
                              callToArchive={callToArchive}
                              toggleCheckBox={toggleCheckBox}
                            />
                            <CallInfo
                              call={call}
                              callBackSelectedCall={(idCall) =>
                                setCallDetails(
                                  callDetails === idCall ? "" : idCall
                                )
                              }
                            />
                            <CallTime
                              call={call}
                              callBackSelectedCall={(idCall) =>
                                setCallDetails(
                                  callDetails === idCall ? "" : idCall
                                )
                              }
                            />
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
