import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiBadge from "components/VuiBadge";
import { useEffect, useState } from "react";

// Images
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";
import avatar5 from "assets/images/avatar5.png";
import avatar6 from "assets/images/avatar6.png";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from 'react-router-dom';
import { getFees } from "network/user/pages";
import { handleDeleteFees } from "network/user/pages";
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

function BasicModal({ FeeCollectionId, fetchData }) {
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      await handleDeleteFees(FeeCollectionId);
      handleClose();
      fetchData(); 
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


function Author({ image, name, email }) {
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

function ManageFees() {
  const [feesData, setFeesData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getFees();
      setFeesData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { name: "Batch", align: "left" },
    { name: "Student", align: "left" },
    { name: "Due", align: "left" },
    { name: "Payment Status", align: "center" },
    { name: "Date", align: "center" },
    { name: "action", align: "center" },
  ];

  const rows = feesData.map((fee) => ({
    "Batch": fee.batch?.name,
    "Student": <Author name={fee.student.name} email={fee.student.email} />,
    "Payment Status": fee.payment_status,
    "Due": fee.amount_to_be_paid,
    "Date": fee.payment_date,
    action: (
      <>
        <VuiBox display="flex" alignItems="center">
          <BasicModal FeeCollectionId={fee._id} fetchData={fetchData} />
          <Link to={`/manageFees/edit/${fee._id}`} style={{ textDecoration: 'none' }}>
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

  return {  columns, rows};
}

export default ManageFees;