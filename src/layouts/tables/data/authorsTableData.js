import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiAvatar from "components/VuiAvatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { getBatches } from "network/user/pages";
import { useSnackbar } from 'notistack';
import { handleDeleteBatch } from "network/user/pages";

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

function BasicModal({ batchId, fetchData }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    try {
      await handleDeleteBatch(batchId);
      handleClose();
      fetchData(); 
      enqueueSnackbar('Batch deleted successfully', { variant: 'success' });
    } catch (error) {
      console.error("Error deleting batch:", error);
      enqueueSnackbar('Error deleting batch', { variant: 'error' });
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
            Are you sure you want to delete batch information?
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

function Student({ image, name, email }) {
  return (
    <VuiBox display="flex" alignItems="center" px={1} py={0.5}>
      <VuiBox mr={2}>
        <VuiAvatar src={image} alt={name} size="sm" variant="rounded" />
      </VuiBox>
      <VuiBox display="flex" flexDirection="column">
        <VuiTypography variant="button" color="white" fontWeight="medium">
          {name}
        </VuiTypography>
        <VuiTypography variant="caption" color="text">
          {email}
        </VuiTypography>
      </VuiBox>
    </VuiBox>
  );
}

function ManageBatches() {
  const [batches, setBatches] = useState([]);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  let fetchData = async () => {
    try {
      const response = await getBatches();
      setBatches(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { name: "Batch Name", align: "left" },
    { name: "Start Date", align: "left" },
    { name: "Duration", align: "center" },
    // { name: "Subject", align: "center" },
    { name: "Action", align: "right" },
  ];

  console.log(batches, 'batches...............................')
  const rows = batches.map((batch) => ({
    "Batch Name": batch.name,
    "Start Date": new Date(batch.startDate).toLocaleDateString(),
    "Duration": batch.duration,
    "Subject": batch.subjects,
    "Action": (
      <>
         <VuiBox display="flex" alignItems="center">
        <BasicModal batchId={batch._id} fetchData={fetchData} />
        {/* <BasicModal resultId={result._id} fetchResults={fetchResults} /> */}
        <Link to={`/batches/edit/${batch._id}`} style={{ textDecoration: 'none' }}>
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
      </>
    ),
  }));

  return { columns, rows };
}

export default ManageBatches;
