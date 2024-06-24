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
import { useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link   } from 'react-router-dom';
import { getEnrollment } from "network/user/pages";
import { handleDeleteEnrollment } from "network/user/pages";
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



function BasicModal({ enrollmentId, fetchData }) {
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      await handleDeleteEnrollment(enrollmentId);
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



// export default {
//   columns: [
//     { name: "Batch", align: "left" },
//     { name: "Username", align: "left" },
//     { name: "Due", align: "left" },
//     { name: "Paid", align: "center" },
//     { name: "Date", align: "center" },
//     { name: "action", align: "center" },
//   ],

//   rows: [
//     {
//       Batch: (
//         <Author
//           image="https://png.pngtree.com/png-vector/20210307/ourmid/pngtree-abstract-creative-vector-batch-with-tick-sign-on-it-png-image_3013581.jpg"
//           name="Alpha Batch"
//           email="esthera@simmmple.com"
//         />
//       ),
//       Username: <Function job="seema@123" org="UserId:123" />,
//       Due: (
//         <VuiBadge
//           variant="standard"
//           badgeContent="1 k"
//           color="success"
//           size="xs"
//           container
//           sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
//             background: success.main,
//             border: `${borderWidth[1]} solid ${success.main}`,
//             borderRadius: borderRadius.md,
//             color: white.main,
//           })}
//         />
//       ),
//       Paid: (
//         <VuiBadge
//           variant="standard"
//           badgeContent="5 k"
//           color="success"
//           size="xs"
//           container
//           sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
//             background: success.main,
//             border: `${borderWidth[1]} solid ${success.main}`,
//             borderRadius: borderRadius.md,
//             color: white.main,
//           })}
//         />
//       ),
//       Date: (
//         <VuiTypography variant="caption" color="white" fontWeight="medium">
//          10 May 2024
//         </VuiTypography>
//       ),
//       action: (
//         <><Link to="/manageEnrollment/edit"> 
//           <VuiTypography
//             component="a"
//             // onClick={onClick}
            
//             variant="caption"
//             color="text"
//             fontWeight="medium"
//             style={{ marginRight: "8px" }} // Adjust margin as needed
//           >
//             Edit
//           </VuiTypography>
//           </Link>
//           <div style={{ display: "inline-block" }}>
//             <VuiTypography
//               component="a"
//               // href="/batches/edit/"
//               variant="caption"
//               color="text"
//               fontWeight="medium"
//             >
//               <BasicModal />
//             </VuiTypography>
//           </div>
//         </>
//       ),
//     },
//     {
//       Batch: (
//         <Author
//           image="https://png.pngtree.com/png-vector/20210307/ourmid/pngtree-abstract-creative-vector-batch-with-tick-sign-on-it-png-image_3013581.jpg"
//           name="Sigma Batch"
//           email="ridima@simmmple.com"
//         />
//       ),
//       Username: <Function job="ria05" org="654" />,
//       Due: (
//         <VuiBadge
//           variant="standard"
//           badgeContent="0"
//           color="success"
//           size="xs"
//           container
//           sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
//             background: success.main,
//             border: `${borderWidth[1]} solid ${success.main}`,
//             borderRadius: borderRadius.md,
//             color: white.main,
//           })}
//         />
//       ),
//       Paid: (
//         <VuiBadge
//           variant="standard"
//           badgeContent="6k"
//           color="success"
//           size="xs"
//           container
//           sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
//             background: success.main,
//             border: `${borderWidth[1]} solid ${success.main}`,
//             borderRadius: borderRadius.md,
//             color: white.main,
//           })}
//         />
//       ),
//       Date: (
//         <VuiTypography variant="caption" color="white" fontWeight="medium">
//           05 May 2024
//         </VuiTypography>
//       ),
//       action: (
//         <>
//         <Link to="/manageEnrollment/edit"> 
//           <VuiTypography
//             component="a"
//             // onClick={onClick}
//             variant="caption"
//             color="text"
//             fontWeight="medium"
//             style={{ marginRight: "8px" }} // Adjust margin as needed
//           >
//             Edit
//           </VuiTypography>
//           </Link> 
//           <div style={{ display: "inline-block" }}>
//             <VuiTypography
//               component="a"
//               // href="/batches/edit/"
//               variant="caption"
//               color="text"
//               fontWeight="medium"
//             >
//               <BasicModal />
//             </VuiTypography>
//           </div>
//         </>
//       ),
//     },
//     {
//       Batch: (
//         <Author
//           image="https://png.pngtree.com/png-vector/20210307/ourmid/pngtree-abstract-creative-vector-batch-with-tick-sign-on-it-png-image_3013581.jpg"
//           name="Alpha Batch"
//           email="esthera@simmmple.com"
//         />
//       ),
//       Username: <Function job="ritika@2" org="874" />,
//       Due: (
//         <VuiBadge
//           variant="standard"
//           badgeContent="2k"
//           color="success"
//           size="xs"
//           container
//           sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
//             background: success.main,
//             border: `${borderWidth[1]} solid ${success.main}`,
//             borderRadius: borderRadius.md,
//             color: white.main,
//           })}
//         />
//       ),
//       Paid: (
//         <VuiBadge
//           variant="standard"
//           badgeContent="6k"
//           color="success"
//           size="xs"
//           container
//           sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
//             background: success.main,
//             border: `${borderWidth[1]} solid ${success.main}`,
//             borderRadius: borderRadius.md,
//             color: white.main,
//           })}
//         />
//       ),
//       Date: (
//         <VuiTypography variant="caption" color="white" fontWeight="medium">
//           15 May 2024
//         </VuiTypography>
//       ),
//       action: (
//         <>
//         <Link to="/manageEnrollment/edit"> 
//           <VuiTypography
//             component="a"
//             // onClick={onClick}
//             variant="caption"
//             color="text"
//             fontWeight="medium"
//             style={{ marginRight: "8px" }} // Adjust margin as needed
//           >
//             Edit
//           </VuiTypography>
//           </Link> 
//           <div style={{ display: "inline-block" }}>
//             <VuiTypography
//               component="a"
//               // href="/batches/edit/"
//               variant="caption"
//               color="text"
//               fontWeight="medium"
//             >
//               <BasicModal />
//             </VuiTypography>
//           </div>
//         </>
//       ),
//     },
//   ],
// };


function ManageEnrollment() {
  const [enrollmentData, setEnrollmentData] = React.useState([]);
  let fetchData = async () => {
    try {
      const response = await getEnrollment();
      setEnrollmentData(response.data);
      console.log(response.data,'enrollment.data.........................................')
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
    { name: "Date", align: "left" },
    { name: "Fee Status", align: "center" },
    { name: "action", align: "center" },
  ];

  const rows = enrollmentData.map((enrollment) => ({
    
    Batch: <Function job={enrollment?.batch_id?.name} />,
    "Student": <Function job={enrollment?.student_id?.name} />,
    Date: <Function job={enrollment?.date_of_joining} />,
    "Fee Status": (
      <VuiBadge
        variant="standard"
        badgeContent={enrollment?.fee_structure_id?.payment_status}
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
    action: (
      <>
        <Link to={`/manageEnrollment/edit/${enrollment._id}`}>
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
            <BasicModal enrollmentId={enrollment._id} fetchData={fetchData} />
          </VuiTypography>
        </div>
      </>
    ),
  }));

  return { columns, rows };
}

export default ManageEnrollment;
