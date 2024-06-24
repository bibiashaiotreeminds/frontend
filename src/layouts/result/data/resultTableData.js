import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getResult, handleDeleteResult } from "network/user/pages";
import { useSnackbar } from 'notistack';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

function BasicModal({ resultId, fetchResults }) {
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      await handleDeleteResult(resultId);
      handleClose();
      fetchResults(); 
      enqueueSnackbar('Result deleted successfully', { variant: 'success' });
    } catch (error) {
      console.error("Error deleting result:", error);
      enqueueSnackbar('Error deleting result', { variant: 'error' });
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} style={{ color: "red" }}>
        Delete
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this result?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button
              style={{
                backgroundColor: "red",
                color: "white",
                borderRadius: "5px",
                padding: "8px 16px",
                border: "none",
                marginRight: "20px",
              }}
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button style={{ marginRight: "60px" }} onClick={handleClose}>
              Cancel
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

function Author({ name }) {
  return (
    <VuiBox display="flex" alignItems="center" px={1} py={0.5}>
      <VuiBox display="flex" flexDirection="column">
        <VuiTypography variant="button" color="white" fontWeight="medium">
          {name}
        </VuiTypography>
      </VuiBox>
    </VuiBox>
  );
}

function Function({ job, org }) {
  return (
    <VuiBox display="flex" flexDirection="column">
      <VuiTypography variant="caption" fontWeight="medium" color="white">
        {job}
      </VuiTypography>
      <VuiTypography variant="caption" color="text">
        {org}
      </VuiTypography>
    </VuiBox>
  );
}

function ManageResults() {
  const [resultData, setResultData] = useState([]);

  const fetchResults = async () => {
    try {
      const response = await getResult();
      setResultData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const columns = [
    { name: "Batch", align: "left" },
    { name: "Student", align: "left" },
    { name: "Test Name", align: "left" },
    { name: "Marks Scored", align: "center" },
    { name: "Result", align: "center" },
    { name: "Remarks", align: "center" },
    { name: "Subject Topic", align: "right" },
    { name: "action", align: "right" },
  ];

  const rows = resultData?.map((result) => ({
    Batch: <Author name={result.batch?.name} />,
    "Student": <Author name={result?.student?.name} />,
   "Test Name": <Function job={result?.testName?.testName} />,
   "Marks Scored": <Function job={result?.MarksScored} />,
   "Result": <Function job={result.Result} />,
   "Remarks": <Function job={result.Remarks} />,
   "Subject Topic":<Function job={result.SubjectTopic} />,
    action: (
      <VuiBox display="flex" alignItems="center">
        <BasicModal resultId={result._id} fetchResults={fetchResults} />
        <Link to={`/manageResult/edit/${result._id}`} style={{ textDecoration: 'none' }}>
          <VuiTypography
            component="span"
            variant="caption"
            color="text"
            fontWeight="medium"
            style={{ marginLeft: '8px' }}
          >
            Edit
          </VuiTypography>
        </Link>
      </VuiBox>
    ),
  }));

  return { columns, rows };
}

export default ManageResults;
