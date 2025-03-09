import FolderOffOutlinedIcon from "@mui/icons-material/FolderOffOutlined";
import "./AlertNoData.css";

const AlertNoData = () => {
  return (
    <div className="alt-nodt-full">
      <div className="alt-nodt-main">
        <div className="alt-nodt-icn">
          <FolderOffOutlinedIcon />
        </div>
        <div className="alt-nodt-txt">No data found</div>
      </div>
    </div>
  );
};

export default AlertNoData;
