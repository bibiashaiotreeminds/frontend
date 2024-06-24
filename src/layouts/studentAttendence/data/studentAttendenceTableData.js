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
import { useEffect, useState } from "react";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import GradientBorder from "examples/GradientBorder";
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

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

function Student({  name, email }) {
 
    return (
      <VuiBox display="flex" alignItems="center" px={1} py={0.5}>
      
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

// const AttendanceStatus = {
//   PRESENT: "Present",
//   ABSENT: "Absent"
// };

// function ManageStudent({ selectedStudent }) {
//   const [checked, setChecked] = useState(true);
//   const [studentInformation, setStudentInformation] = useState({
//     name:"",
//     attendanceStatus:""
//   });


//   if(checked){
//     studentInformation.attendanceStatus=AttendanceStatus.PRESENT
//     studentInformation.name
//   }else{
//     studentInformation.attendanceStatus=AttendanceStatus.ABSENT
//     studentInformation.name
//   }


//   // useEffect(() => {
//   //   const initialStatus = {};
//   //   selectedStudent.forEach((student) => {
//   //     initialStatus[student._id] = AttendanceStatus.ABSENT; 
//   //   });
//   //   setAttendanceStatus(initialStatus);
//   //   console.log(attendanceStatus,'attendanceStatus..................................')
//   // }, [selectedStudent]);

//   // const handleOnChange = (studentId) => (e) => {
//   //   const { checked } = e.target;
//   //   setAttendanceStatus((prevAttendance) => ({
//   //     ...prevAttendance,
//   //     [studentId]: checked ? AttendanceStatus.PRESENT : AttendanceStatus.ABSENT,
//   //   }));
//   // };

//   const columns = [
//     { name: "Students", align: "left" },
//     { name: "Attendance", align: "center" }
//   ];

//   const rows = selectedStudent.map((student) => ({

//     Students:
//     <>
//     <div style={{ display: 'flex', alignItems: 'center' }}>
//       <input
//         key={student._id} 
//         type="checkbox" 
//         id="checked" 
//         value={checked}
//         onChange={e => {
//           setChecked(e.target.checked);
//         }}
//         style={{ marginRight: '10px' }}
//       />
//       <Student name={student.name} email={student._id} />
//     </div>
//   </>
  
    
//     //   <Student key={student._id} name={student.name} email={student.email} />,
    
//     //<GradientBorder
//     //       minWidth="100%"
//     //       borderRadius={borders.borderRadius.lg}
//     //       padding="1px"
//     //       backgroundImage={radialGradient(
//     //         palette.gradients.borderLight.main,
//     //         palette.gradients.borderLight.state,
//     //         palette.gradients.borderLight.angle
//     //       )}
//     //     >
//     //       <VuiInput
//     //         name={`attendanceStatus_${student._id}`}
//     //         checked={attendanceStatus[student._id] === AttendanceStatus.PRESENT}
//     //         onChange={handleOnChange({studentId:student._id})}
//     //         type="checkbox"
//     //         placeholder="Enter Test Form"
//     //         sx={({ typography: { size } }) => ({
//     //           fontSize: size.sm,
//     //           color: "white",
//     //         })}
//     //       />
//     //     </GradientBorder>
//    //  </VuiBox>
  
//        }));

//   return { columns, rows,attendanceStatus };
// }

// export default ManageStudent;

const AttendanceStatus = {
  PRESENT: "Present",
  ABSENT: "Absent"
};

function ManageStudent({ selectedStudent }) {
  
  const [attendanceStatus, setAttendanceStatus] = useState({}); // State for attendance status
console.log(selectedStudent,'selectedStudent................................')
  // Initialize attendance status for selected students
  const initializeAttendanceStatus = () => {
    const initialStatus = {};
    selectedStudent.forEach((student) => {
      initialStatus[student._id] = AttendanceStatus.ABSENT;
    });
    return initialStatus;
  };

  // Update attendance status based on checkbox state
  const handleCheckboxChange = (studentId) => (e) => {
    const isChecked = e.target.checked;
    setAttendanceStatus(prevStatus => ({
      ...prevStatus,
      [studentId]: isChecked ? AttendanceStatus.PRESENT : AttendanceStatus.ABSENT
    }));
  };

  const handleSelectAll = () => {
    const allPresentStatus = {};
    selectedStudent.forEach((student) => {
      allPresentStatus[student._id] = AttendanceStatus.PRESENT;
    });
    setAttendanceStatus(allPresentStatus);
  };

  const handleClearAll = () => {
    const allPresentStatus = {};
    selectedStudent.forEach((student) => {
      allPresentStatus[student._id] = AttendanceStatus.ABSENT;
    });
    setAttendanceStatus(allPresentStatus);
  };

  // Initialize attendance status when component mounts
  useState(() => {
    setAttendanceStatus(initializeAttendanceStatus());
  }, [selectedStudent]); // Update if selected students change

  // Define table columns
  const columns = [
    { name: "Students", align: "left" },
    // { name: "Attendance", align: "center" } // You can remove this line if you don't want to display Attendance column
  ];

  // Create rows for each selected student
  const rows = selectedStudent?.map((student) => ({
    Students: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          key={student._id}
          type="checkbox"
          checked={attendanceStatus[student._id] === AttendanceStatus.PRESENT}
          onChange={handleCheckboxChange(student._id)}
          style={{ marginRight: '10px' }}
        />
        <Student name={student.name} email={student._id} />
      </div>
    ),
    // You can optionally add Attendance status here if needed
    // Attendance: attendanceStatus[student._id] || AttendanceStatus.ABSENT
  }));

  return { columns, rows, attendanceStatus, handleSelectAll, handleClearAll };
}

export default ManageStudent;
