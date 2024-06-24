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

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link   } from 'react-router-dom';


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



function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              onClick={handleClose}
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



export default {
  columns: [
    { name: "Date", align: "left" },
    { name: "Login", align: "left" },
    { name: "Logout", align: "left" },
    { name: "Total_hours", align: "center" },
  ],

  rows: [
    {
    
        Date: <Function job="10 May 2024"  />,
        Login: <Function job="9.40 Am" />,
        Logout : (
          <VuiTypography variant="caption" color="white" fontWeight="medium">
           7.40 Am
          </VuiTypography>
        ),
        Total_hours: (
            <VuiTypography variant="caption" color="white" fontWeight="medium">
             9 hours
            </VuiTypography>
          ),
      },
      {
        Date: <Function job="10 May 2024"  />,
        Login: <Function job="9.40 Am" />,
        Logout : (
          <VuiTypography variant="caption" color="white" fontWeight="medium">
           7.40 Am
          </VuiTypography>
        ),
        Total_hours: (
            <VuiTypography variant="caption" color="white" fontWeight="medium">
             9 hours
            </VuiTypography>
          ),
      },
      {
        Date: <Function job="10 May 2024"  />,
        Login: <Function job="9.40 Am" />,
        Logout : (
          <VuiTypography variant="caption" color="white" fontWeight="medium">
           7.40 Am
          </VuiTypography>
        ),
        Total_hours: (
            <VuiTypography variant="caption" color="white" fontWeight="medium">
             9 hours
            </VuiTypography>
          ),
      },
  ],
};
