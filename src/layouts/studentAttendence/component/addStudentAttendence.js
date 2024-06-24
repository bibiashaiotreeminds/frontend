import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import { getBatches, getSubject, getstudent } from "network/user/pages";
import ManageStudent from "../data/studentAttendenceTableData";
import { createAttendence } from "network/user/pages";
import { useSnackbar } from 'notistack';
import { getAllBatchesenrolledByStudent } from "network/user/pages";

function NativeSelectDemo({ batches, setSelectedBatch }) {
  const handleChange = (e) => {
    setSelectedBatch(e.target.value);
  };

  return (
    <div>
      <select
        onChange={handleChange}
        style={{
          backgroundColor: "transparent",
          padding: "10px",
          width: "355px",
          height: "40px",
          marginTop: "10px",
          border: "3px solid #4a5568",
          borderRadius: "15px",
           color: "white",
        }}
      >
        {batches?.map((option) => (
          <option
            key={option?.batch_id?._id}
            value={option?.batch_id?._id}
            style={{ backgroundColor: "transparent", color: "black" }}
          >
            {option?.batch_id?.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function NativeSelectSubjects({ subjects, setSelectedStudent }) {
  const handleChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  return (
    <div>
      <select
        onChange={handleChange}
        style={{
          backgroundColor: "transparent",
          padding: "10px",
          width: "355px",
          height: "40px",
          marginTop: "10px",
          border: "3px solid #4a5568",
          borderRadius: "15px",
          color: "white",
        }}
      >
        {subjects?.map((option, index) => (
          <option
            key={index}
            value={option._id}
            style={{ backgroundColor: "transparent", color: "black" }}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function AddStudentAttendance() {
  const [batches, setBatches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState([]);
  const { columns, rows, attendanceStatus, handleSelectAll, handleClearAll} = ManageStudent({selectedStudent});
  const [date, setDate] = useState("");
  const { enqueueSnackbar } = useSnackbar();
console.log(batches,'batches....................................................')
let key;
let value
for ( key in attendanceStatus) {
  if (attendanceStatus.hasOwnProperty(key)) {
     value = attendanceStatus[key];
    console.log(`Key: ${key}, Value: ${value}`);
  }
}
console.log(`Key: ${key}, Value: ${value}.......................................................`);
  const data = {
    batch: selectedBatch,
    subjectName: subjects[0],
    date: date,
    student: [{
      name: key, 
      attendanceStatus: value,
    }],
  };
  console.log(rows.Students)
//
  const handleOnChange = (e) => {
    setDate(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBatchesenrolledByStudent();
        //const response = await getBatches(); 
        setBatches(response.data);
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSubjectAndStudents = async () => {
      if (selectedBatch) {
        try {
          const subjectResponse = await getSubject(selectedBatch);
          setSubjects(subjectResponse.data.subjects);

          const studentResponse = await getstudent(selectedBatch);
          setSelectedStudent(studentResponse.data.student);
        } catch (error) {
          console.error("Error fetching subjects or students:", error);
        }
      }
    };

    fetchSubjectAndStudents();
  }, [selectedBatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(data,'inside the handlesubmit........................')
      const response = await createAttendence(data);
      console.log(response, 'createAttendence........................')
     
      if (response.data) {
        enqueueSnackbar(`'Attendence is registered successfully'`, { variant: 'success' });
        // history.push("/batches/"); 
      } 
    } catch (error) {
      console.error("Error creating batch:", error);
      enqueueSnackbar('Error creating batch', { variant: 'error' });
    }
  };

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
              // className="row"
          
              // role="form"
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
                    Batch Name
                    <NativeSelectDemo batches={batches} setSelectedBatch={setSelectedBatch} />
                  </VuiTypography>
                </VuiBox>
              </VuiBox>

              <VuiBox mb={2} flexBasis="" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Subject Name
                    <NativeSelectSubjects
                      subjects={subjects}
                      setSelectedStudent={setSelectedStudent}
                    />
                  </VuiTypography>
                </VuiBox>
              </VuiBox>
              <VuiBox mb={2} flexBasis="33%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Date
                  </VuiTypography>
                </VuiBox>
                <GradientBorder
                  minWidth="100%"
                  borderRadius={borders.borderRadius.lg}
                  padding="1px"
                  backgroundImage={radialGradient(
                    palette.gradients.borderLight.main,
                    palette.gradients.borderLight.state,
                    palette.gradients.borderLight.angle
                  )}
                >
                  <VuiInput
                    name="date"
                    value={date}
                    onChange={handleOnChange}
                    type="date"
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                      color: "white",
                    })}
                  />
                </GradientBorder>
              </VuiBox>

              <VuiBox mt={3} textAlign="center"></VuiBox>
              </VuiBox>
          </GradientBorder>
        </VuiBox>
            

        <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="32px">
          <VuiTypography variant="lg" fontWeight="bold" color="white"></VuiTypography>
        </VuiBox>
        <VuiBox py={3}     >
          <VuiBox mb={3}>
            <Card >
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

export default AddStudentAttendance;
