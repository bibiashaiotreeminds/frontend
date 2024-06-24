import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Card } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import GradientBorder from "examples/GradientBorder";
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { IoChevronBackOutline } from "react-icons/io5";
import Table from "examples/Tables/Table";
import { getBatches, getSubject, getstudent, createAttendence, getAttendenceByID, getAllBatchesenrolledByStudent } from "network/user/pages";
import ManageStudent from "../data/studentAttendenceTableData";
import { useSnackbar } from 'notistack';
import { updateAttendence } from "network/user/pages";

function EditStudentAttendence() {
  const { attendenceId } = useParams();
  const history = useHistory();
  const [batches, setBatches] = useState([]);
  const [subjects, setSubjects] = useState("");
  const [attendenceInfo, setAttendenceInfo] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState([]);
  const { columns, rows, attendanceStatus, handleSelectAll, handleClearAll } = ManageStudent({ selectedStudent });
  const [date, setDate] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const fetchAttendenceByID = async () => {
    try {
      const response = await getAttendenceByID(attendenceId);
      if (response.data) {
        setAttendenceInfo(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchStudentData = async (batchId) => {
    try {
      const studentResponse = await getstudent(batchId);
      setSelectedStudent(studentResponse.data.student);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchAttendenceByID();
  }, [attendenceId]);

  useEffect(() => {
    if (attendenceInfo) {
      setSelectedBatch(attendenceInfo.batch?._id);
      setSubjects(attendenceInfo.subjectName);
      fetchStudentData(attendenceInfo.batch?._id);
      setDate(attendenceInfo?.date)
    }
  }, [attendenceInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const attendanceData = Object.keys(attendanceStatus).map(key => ({
      name: key,
      attendanceStatus: attendanceStatus[key]
    }));

    const data = {
      batch: selectedBatch,
      subjectName: subjects,
      date: date,
      student: attendanceData,
    };

    console.log(data,'data.......................................')

    try {
      const response = await updateAttendence({attendenceId:attendenceId,payload:data});
      if (response.data) {
        enqueueSnackbar('Attendance is updated successfully', { variant: 'success' });
        history.push("/studentAttendance/");
      }
    } catch (error) {
      console.error("Error updated attendance:", error);
      enqueueSnackbar('Error updated attendance', { variant: 'error' });
    }
  }


//   const { attendenceId } = useParams();
//   const history = useHistory();
//   const [batches, setBatches] = useState([]);
//   const [subjects, setSubjects] = useState("");
//   const [attendenceInfo, setAttendenceInfo] = useState([]);
//   const [selectedBatch, setSelectedBatch] = useState("");
//   const [selectedStudent, setSelectedStudent] = useState([]);
//   const { columns, rows, attendanceStatus, handleSelectAll, handleClearAll} = ManageStudent({selectedStudent});
//   const [date, setDate] = useState("");
//   const { enqueueSnackbar } = useSnackbar();
  
//   const [datas, setData] = useState({
//     // batch: selectedBatch,
//     // subjectName: subjects[0],
//     // date: date,
//     // student: [],
//   });

//   let key;
// let value
// for ( key in attendanceStatus) {
//   if (attendanceStatus.hasOwnProperty(key)) {
//      value = attendanceStatus[key];
//     console.log(`Key: ${key}, Value: ${value}`);
//   }
// }


//   console.log(`Key: ${key}, Value: ${value}.......................................................`);
//   const data = {
//     batch: selectedBatch,
//     subjectName: subjects,
//     date: date,
//     student: [{
//       name: key, 
//       attendanceStatus: value,
//     }],
//   };


//   console.log(data,'data.....................')

//   const fetchAttendenceByID = async () => {
//     try {
//       const response = await getAttendenceByID(attendenceId);
//       console.log(response.data,'response....................................................')
//       if (response.data) {
//          setAttendenceInfo(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     // const fetchData = async () => {
//     //   try {
//     //     const response = await getAllBatchesenrolledByStudent();
//     //    // console.log(response.data,'batch....................')
//     //     setBatches(response.data);
//     //   } catch (error) {
//     //     console.error("Error fetching batches:", error);
//     //   }
//     // };
//     // const fetchDBatchByID = async () => {
//     //   try {
//     //     const response = await getBatchByID(data.batch);
//     //     console.log(response.data,'batch....................')
//     //     setBatchDetails(response.data);
//     //   } catch (error) {
//     //     console.error("Error fetching batches:", error);
//     //   }
//     // };
//     // fetchDBatchByID();

//    // fetchData();
//     fetchAttendenceByID();
   
//   }, []);

//   useEffect(() => {
//     const fetchSubjectAndStudents = async () => {
//       if (selectedBatch) {
//         try {
//           // const subjectResponse = await getSubject(selectedBatch);
//           // setSubjects(subjectResponse.data.subjects);

//           const studentResponse = await getstudent(attendenceInfo?.batch?._id);
//           console.log(studentResponse,'studentResponse.....................................')
//           setSelectedStudent(studentResponse.data.student);
//         } catch (error) {
//           console.error("Error fetching subjects or students:", error);
//         }
//       }
//     };
//     if(attendenceInfo){
//       setSelectedBatch(attendenceInfo?.batch?._id);
//       setSubjects(attendenceInfo?.subjectName);
//       setDate(attendenceInfo.date);
//     }

//     fetchSubjectAndStudents();
//   }, [selectedBatch]);

 

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await createAttendence(data);
//       if (response.data) {
//         enqueueSnackbar('Attendance is registered successfully', { variant: 'success' });
//       } 
//     } catch (error) {
//       console.error("Error creating attendance:", error);
//       enqueueSnackbar('Error creating attendance', { variant: 'error' });
//     }
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <VuiBox
          className="row"
          component="form"
          onSubmit={handleSubmit}
          role="form"
        >
          <VuiBox py={3}>
            <GradientBorder borderRadius={borders.borderRadius.form} minWidth="100%" maxWidth="100%">
              <VuiBox
                borderRadius="inherit"
                p="45px"
                sx={({ palette: { secondary } }) => ({
                  backgroundColor: secondary.focus,
                })}
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="space-between"
              >
                <Link to="/studentAttendance/" style={{ fontSize: "28px", color: "white" }}>
                  <IoChevronBackOutline />
                </Link>
                <VuiTypography
                  color="white"
                  fontWeight="bold"
                  textAlign="center"
                  mb="40px"
                  mr="930px"
                  mt="40px"
                  sx={({ typography: { size } }) => ({
                    fontSize: size.lg,
                  })}
                >
                  Mark Student's Attendance
                </VuiTypography>

                <VuiBox mb={2} flexBasis="" className="col-3">
                  <VuiBox mb={1} ml={0.5}>
                    <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                      Batch Name{ " : " }
                      {/* <NativeSelectDemo batches={batches} setSelectedBatch={setSelectedBatch} /> */}
                    </VuiTypography>
                    <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                     { attendenceInfo.batch?.name}
                      {/* <NativeSelectDemo batches={batches} setSelectedBatch={setSelectedBatch} /> */}
                    </VuiTypography>
                  </VuiBox>
                </VuiBox>

                <VuiBox mb={2} flexBasis="" className="col-3">
                  <VuiBox mb={1} ml={0.5}>
                    <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                      Subject Name { " : " }
                    </VuiTypography>
                    <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    { attendenceInfo?.subjectName}
                    </VuiTypography>
                  </VuiBox>
                </VuiBox>
                <VuiBox mb={2} flexBasis="33%" className="col-3">
                  <VuiBox mb={1} ml={0.5}>
                    <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                      Date { " : " }
                    </VuiTypography>
                    <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    { attendenceInfo?.date}
                    </VuiTypography>
                  </VuiBox>
                </VuiBox>

                <VuiBox mt={3} textAlign="center"></VuiBox>
              </VuiBox>
            </GradientBorder>
          </VuiBox>

          <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="32px">
            <VuiTypography variant="lg" fontWeight="bold" color="white"></VuiTypography>
          </VuiBox>
          <VuiBox py={3}>
            <VuiBox mb={3}>
              <Card>
                <VuiBox display="" justifyContent="space-between" alignItems="center" mb="22px">
                  <VuiTypography variant="" color="white">
                    Students
                  </VuiTypography>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "flex" }}>
                      <VuiBox mt={4} mb={1}>
                        <Link>
                          <VuiTypography variant="" color="white" style={{ fontSize: "14px" }} onClick={handleSelectAll}>
                            Select All
                          </VuiTypography>
                        </Link>
                      </VuiBox>

                      <VuiBox mt={4} mb={1} mx={4}>
                        <Link>
                          <VuiTypography variant="lg" color="white" style={{ fontSize: "14px" }} onClick={handleClearAll}>
                            Clear
                          </VuiTypography>
                        </Link>
                      </VuiBox>
                    </div>

                    <VuiBox mt={4} mb={1}>
                      <VuiButton color="info" type='submit'>Mark Attendance</VuiButton>
                    </VuiBox>
                  </div>
                </VuiBox>
                <VuiBox
                  sx={{
                    "& th": {
                      borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                        `${borderWidth[1]} solid ${grey[700]}`,
                    },
                    "& .MuiTableRow-root:not(:last-child)": {
                      "& td": {
                        borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                          `${borderWidth[1]} solid ${grey[700]}`,
                      },
                    },
                    "& .MuiTableCell-root": {
                      paddingRight: "8px",
                      paddingLeft: "8px",
                    },
                  }}
                >
                  <Table columns={columns} rows={rows} />
                </VuiBox>
              </Card>
            </VuiBox>
          </VuiBox>
        </VuiBox>
      </DashboardLayout>
    </>
  );
}

export default EditStudentAttendence;

