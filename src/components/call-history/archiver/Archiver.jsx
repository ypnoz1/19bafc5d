import { useState, useContext } from "react";
import AxiosInstance, { baseApiUrl } from "../../../api/AxiosInstance.js";
import DriveFileMoveOutlinedIcon from "@mui/icons-material/DriveFileMoveOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LoaderDots from "../../loader/dots/LoaderDots.jsx";
import MenuContext from "../../../context/menu/MenuContext.jsx";
import { MenuLabel } from "../../../constants/menu.jsx";
import "./Archiver.css";

const Archiver = ({
  countSelected,
  isSelectedAll,
  callToArchive,
  callBackToggleSelectAll,
  callBackRefresh,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const { activeLabel } = useContext(MenuContext);

  const archiveSelected = () => {
    setIsSaving(true);
    if (activeLabel === MenuLabel.ARCHIVE && isSelectedAll) {
      AxiosInstance.patch(`${baseApiUrl}/reset`).then((res) => {
        callBackRefresh();
        setIsSaving(false);
      });
    } else {
      const promises = [];
      callToArchive.forEach((idCall) => {
        promises.push(
          AxiosInstance.patch(`${baseApiUrl}/activities/${idCall}`, {
            is_archived: activeLabel === MenuLabel.ARCHIVE ? false : true,
          })
        );
      });
      Promise.all(promises)
        .then((values) => {
          callBackRefresh();
        })
        .finally(() => setIsSaving(false));
    }
  };

  return (
    <>
      {countSelected > 0 && (
        <div className="achv-main">
          <div
            className="achv-x"
            onClick={callBackToggleSelectAll}
            title={isSelectedAll ? "Unselect all" : "Select all"}
          >
            {isSelectedAll ? (
              <CheckBoxOutlinedIcon />
            ) : (
              <IndeterminateCheckBoxOutlinedIcon />
            )}
          </div>
          <div className="achv-sel">
            {isSaving && <LoaderDots isSaving={isSaving} />}
            {!isSaving && <>{countSelected} Selected</>}
          </div>
          <div
            className="achv-btn"
            onClick={archiveSelected}
            title={
              activeLabel === MenuLabel.ARCHIVE
                ? "Remove from archive"
                : "Move to archive"
            }
          >
            {activeLabel === MenuLabel.ARCHIVE ? (
              <DeleteOutlineOutlinedIcon />
            ) : (
              <DriveFileMoveOutlinedIcon />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Archiver;
