import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgSignIn from "assets/images/signUpImage.png";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { IoChevronBackOutline } from "react-icons/io5";
import { getBatchesForTests, getStudentsForResult, updateEnrollment, getEnrollmentById, getFees } from "network/user/pages";
import { useSnackbar } from "notistack";
import * as React from 'react';
import { getEnrollmentByID } from "network/user/pages";
import { editEnrollment } from "network/user/pages";

function NativeSelectDemo({ batches, onSelectBatch, selectedBatchId }) {
  const handleChange = (e) => {
    onSelectBatch(e.target.value);
  };

  return (
    <div>
      <select
        onChange={handleChange}
        value={selectedBatchId}
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
        {batches?.map((batch) => (
          <option key={batch._id} value={batch._id} style={{ backgroundColor: "transparent", color: "black" }}>
            {batch.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function NativeSelectForStudent({ students, onSelectStudents, selectedStudentId }) {
  const handleChange = (e) => {
    onSelectStudents(e.target.value);
  };

  return (
    <div>
      <select
        onChange={handleChange}
        value={selectedStudentId}
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
        {students?.map((student) => (
          <option key={student._id} value={student._id} style={{ backgroundColor: "transparent", color: "black" }}>
            {student.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function NativeSelectForFees({ fees, onSelectFees, selectedFeeId }) {
  const handleChange = (e) => {
    onSelectFees(e.target.value);
  };

  return (
    <div>
      <select
        onChange={handleChange}
        value={selectedFeeId}
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
        {fees?.map((fee) => (
          <option key={fee._id} value={fee._id} style={{ backgroundColor: "transparent", color: "black" }}>
            {fee.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function EditEnrollment() {
  const { enrollmentId } = useParams();
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);
  const [fees, setFees] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    student_id: "",
    batch_id: "",
    date_of_joining: "",
    fee_structure_id: "",
    discount: ""
  });

  const fetchEnrollment = async () => {
    try {
      console.log(enrollmentId,'enrollmentId........................................................')
      const response = await getEnrollmentByID({enrollmentId});
      console.log(response,'enrollment......................................................')
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching enrollment:", error);
    }
  };

  const fetchStudentsForResult = async () => {
    try {
      const response = await getStudentsForResult();
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchFees = async () => {
    try {
      const response = await getFees();
      setFees(response.data);
    } catch (error) {
      console.error("Error fetching fees:", error);
    }
  };

  const fetchBatchesForTest = async () => {
    try {
      const response = await getBatchesForTests();
      setBatches(response.data);
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  useEffect(() => {
    fetchEnrollment();
    fetchBatchesForTest();
    fetchFees();
    fetchStudentsForResult();
  }, [enrollmentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await editEnrollment({enrollmentId, payload:formData});
      console.log(response,'response.............................')
      if (response.data.message === 'Enrollment update successfully') {
        enqueueSnackbar('Enrollment updated successfully', { variant: 'success' });
      }
    } catch (error) {
        console.error("Error updating Enrollment:", error);
        enqueueSnackbar('Error updating Enrollment', { variant: 'error' });
      
   }
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <VuiBox py={3}>
          <GradientBorder borderRadius={borders.borderRadius.form} minWidth="100%" maxWidth="100%">
            <VuiBox
              className="row"
              component="form"
              onSubmit={handleSubmit}
              role="form"
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
              <Link to="/manageEnrollment/" style={{ fontSize: "28px", color: "white" }}>
                <IoChevronBackOutline />
              </Link>
              <VuiTypography
                color="white"
                fontWeight="bold"
                textAlign="center"
                mb="40px"
                mr="1040px"
                mt="40px"
                sx={({ typography: { size } }) => ({
                  fontSize: size.lg,
                })}
              >
                Edit Enrollment
              </VuiTypography>

              <VuiBox mb={2} flexBasis="33%">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Select Batch
                  </VuiTypography>
                </VuiBox>
                <NativeSelectDemo
                  batches={batches}
                  selectedBatchId={formData?.batch_id}
                  onSelectBatch={(value) => setFormData({ ...formData, batch_id: value })}
                />
              </VuiBox>

              <VuiBox mb={2} flexBasis="33%">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Select Student
                  </VuiTypography>
                </VuiBox>
                <NativeSelectForStudent
                  students={students}
                  selectedStudentId={formData?.student_id}
                  onSelectStudents={(value) => setFormData({ ...formData, student_id: value })}
                />
              </VuiBox>

              <VuiBox mb={2} flexBasis="33%">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Select Fees
                  </VuiTypography>
                </VuiBox>
                <NativeSelectForFees
                  fees={fees}
                  selectedFeeId={formData?.fee_structure_id}
                  onSelectFees={(value) => setFormData({ ...formData, fee_structure_id: value })}
                />
              </VuiBox>

              <VuiBox mb={2} flexBasis="33%">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Date of Joining
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
                    type="text"
                    placeholder="date"
                    name="date_of_joining"
                    value={formData?.date_of_joining}
                    onChange={handleChange}
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                    })}
                  />
                </GradientBorder>
              </VuiBox>

              <VuiBox mb={2} flexBasis="33%">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Discount
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
                    type="text"
                    placeholder="Discount"
                    name="discount"
                    value={formData?.discount}
                    onChange={handleChange}
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                    })}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2} flexBasis="33%">
             
              </VuiBox>

              <VuiBox mt={4} mb={1}>
                <VuiButton color="info" type="submit" fullWidth>
                  Update Enrollment
                </VuiButton>
              </VuiBox>
            </VuiBox>
          </GradientBorder>
        </VuiBox>
      </DashboardLayout>
    </>
  );
}

export default EditEnrollment;
