/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

/* eslint-disable react/prop-types */
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiBadge from "components/VuiBadge";

// Images
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";
import avatar5 from "assets/images/avatar5.png";
import avatar6 from "assets/images/avatar6.png";
import DeleteStudent from "layouts/billing/managestudent/deleteStudent";
import { useState, useEffect } from "react";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from 'react-router-dom';
import VuiInput from "components/VuiInput";
import { getAllStudent } from "network/user/pages";
import { handleDeleteAttendence } from "network/user/pages";

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


function BasicModal({ attendenceId, fetchData }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {

    try {
     await handleDeleteAttendence(attendenceId);
      // toast("Test deleted successfully!");
      handleClose();
      fetchData();

    } catch (error) {
      console.error("Error deleting test:", error);
      // toast("Failed to delete test.");
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

function ManageStudentAttendence() {
  const [StudentData, setStudentData] = useState([]);
  let fetchData = async () => {
    try {
      const response = await getAllStudent();
      setStudentData(response.data);
      console.log(response.data, 'response.data.........................................')
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { name: "Batch", align: "left" },
    { name: "Date", align: "center" },
    { name: "subject Name", align: "center" },
    { name: "action", align: "center" },
  ];

  const rows = StudentData.map((attendence) => ({
    Batch: <Function job={attendence.batch?.name} />,
    Date: <Function job={attendence.date} />,
    "subject Name": <Function job={attendence.subjectName} />,
    action: (
      <>
        <Link to={`/studentAttendence/edit/${attendence._id}`}>
          <VuiTypography
            component="a"
            variant="caption"
            color="text"
            fontWeight="medium"
            style={{ marginRight: "8px" }}
          >
            Edit
          </VuiTypography>
        </Link>
        <div style={{ display: "inline-block" }}>
          <VuiTypography
            component="a"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            <BasicModal attendenceId={attendence._id} fetchData={fetchData} />
          </VuiTypography>
        </div>
      </>
    ),
  }));

  return { columns, rows };
}

export default ManageStudentAttendence;



