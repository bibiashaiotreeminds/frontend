import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { getStudent } from "network/user/pages";
import { handleDeleteStudent } from "network/user/pages";
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

function BasicModal({ studentId, fetchData }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    try {
      await handleDeleteStudent(studentId)
      handleClose();
      fetchData(); 
      enqueueSnackbar('Student deleted successfully', { variant: 'success' });
    } catch (error) {
      console.error("Error deleting student:", error);
      enqueueSnackbar('Error deleting student', { variant: 'error' });
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
            Are you sure you want to delete student information?
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

function ManageStudents() {
  const [studentsData, setStudentsData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getStudent();
      setStudentsData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columnsStudent = [
    { name: "Student", align: "left" },
    { name: "Standard", align: "left" },
    { name: "School", align: "left" },
    { name: "Address", align: "center" },
    { name: "Parents", align: "center" },
    { name: "Mentor", align: "center" },
    { name: "action", align: "center" },
  ];

  const rowsStudent = studentsData.map((student) => ({
    "Student": <Student image={student.image} name={student.name} email={student.email} />,
    "Standard": student.standard,
    "School": student.schoolName,
    "Address": student.address,
    "Parents": (
      <Function
        job={`Father: ${student.fatherName} ${student.fatherPhoneNumber}`}
        org={`Mother: ${student.motherName} (${student.motherPhoneNumber})`}
      />
    ),
    "Mentor": student.mentor,
    action: (
      <>
        <VuiBox display="flex" alignItems="center">
          <BasicModal studentId={student._id} fetchData={fetchData} />
          <Link to={`/manageStudents/edit/${student._id}`} style={{ textDecoration: 'none' }}>
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

  return { columnsStudent, rowsStudent };
}

export default ManageStudents;
