import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiBadge from "components/VuiBadge";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from 'react-router-dom';
import { deleteTest, getTests } from "../../../network/user/pages";
import { useEffect, useState } from "react";

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

function BasicModal({ testId, fetchData }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {

    try {
     await deleteTest(testId);
      handleClose();
      fetchData();

    } catch (error) {
      console.error("Error deleting test:", error);
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

function ManageTest() {
  const [testData, settestData] = useState([]);
  let fetchData = async () => {
    try {
      const response = await getTests();
      settestData(response.data);
      console.log(response.data,'response.data.........................................')
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (test) => {
    window.location.href = test.testForm;
  }

  const columns = [
    { name: "Batch", align: "left" },
    { name: "Test Name", align: "left" },
    { name: "Date", align: "center" },
    { name: "Test Form", align: "center" },
    { name: "action", align: "center" },
  ];

  const rows = testData.map((test) => ({
    
    Batch: <Function job={test.batch.name} />,
    "Test Name": <Function job={test.testName} />,
    Date: <Function job={test.date} org={test.time} />,
    "Total Marks": (
      <VuiBadge
        variant="standard"
        badgeContent={test.totalMarks}
        color="success"
        size="xs"
        container
        sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
          background: success.main,
          border: `${borderWidth[1]} solid ${success.main}`,
          borderRadius: borderRadius.md,
          color: white.main,
        })}
      />
    ),
    "Minimum Marks": (
      <VuiBadge
        variant="standard"
        badgeContent={test.minimumMarks}
        color="success"
        size="xs"
        container
        sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
          background: success.main,
          border: `${borderWidth[1]} solid ${success.main}`,
          borderRadius: borderRadius.md,
          color: white.main,
        })}
      />
    ),
    "Test Form": (
      <VuiTypography
        component="a"
        variant="caption"
        color="text"
        fontWeight="medium"
        style={{ marginRight: "8px" }}
        href={test.testForm}
      >
        Test Form
      </VuiTypography>

    ),
    action: (
      <>
        <Link to={`/manageTest/edit/${test._id}`}>
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
            <BasicModal testId={test._id} fetchData={fetchData} />
          </VuiTypography>
        </div>
      </>
    ),
  }));

  return { columns, rows };
}

export default ManageTest;
