import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link   } from 'react-router-dom';
import { handleDeleteTeacher } from "network/user/pages";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

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

function BasicModal({userId}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      await handleDeleteTeacher()
      // toast("Teacher deatails are deleted successfully!");
      handleClose();
      console.log("Teacher deatails are deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
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

function ManageTeachers() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/api/manage-teacher/get-user`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { name: "Teacher", align: "left" },
    { name: "Qualification", align: "left" },
    { name: "Address", align: "left" },
    { name: "Type", align: "center" },
    { name: "Subjects", align: "center" },
    { name: "action", align: "center" },
  ];

  const rows = userData.map((user) => ({
    Teacher: <Student image={user.image} name={user.name} email={user.email} />,
    Qualification: <Function job={user.qualification} org={`experience: ${user.experience} years`} />,
    Address: user.address,
    Type: user.contractType,
    Subjects: user.subject,
    action: (
      <>
        <VuiBox display="flex" alignItems="center">
        <BasicModal userId={user._id} />
        <Link to={`/manageTeachers/edit/${user._id}`} style={{ textDecoration: 'none' }}>
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

export default ManageTeachers;
