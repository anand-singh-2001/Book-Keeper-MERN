import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = () => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}>
      <CircularProgress style={{ color: "white" }} />
    </Backdrop>
  );
};

export default Spinner;
