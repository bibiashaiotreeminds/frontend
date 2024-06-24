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

import { useState, useEffect } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

// Icons
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import rgba from "assets/theme/functions/rgba";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signUpImage.png";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { IoArrowBackCircle, IoChevronBackOutline } from "react-icons/io5";

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { getBatchesForTests } from "network/user/pages";
import { getStudentsForResult } from "network/user/pages";
import { useSnackbar } from "notistack";
import { createEnrollment } from "network/user/pages";
import { getFees } from "network/user/pages";

function NativeSelectDemo({ batches, onSelectBatch }) {
  const handleChange = (e) => {
    onSelectBatch(e.target.value);
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
        {batches?.map((batch) => (
          <option key={batch._id} value={batch._id} style={{ backgroundColor: "transparent", color: "black" }}>
            {batch.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function NativeSelectForStudent({ students, onSelectStudents }) {
  const handleChange = (e) => {
    onSelectStudents(e.target.value);
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
        {students?.map((student) => (
          <option key={student._id} value={student._id} style={{ backgroundColor: "transparent", color: "black" }}>
            {student.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function NativeSelectForFees({ fees, onSelectStudents }) {
  const handleChange = (e) => {
    onSelectStudents(e.target.value);
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
        {fees?.map((fee) => (
          <option key={fee._id} value={fee._id} style={{ backgroundColor: "transparent", color: "black" }}>
            {fee.name}
          </option>
        ))}
      </select>
    </div>
  );
}



function addEnrollment() {
  //const [rememberMe, setRememberMe] = useState(true);
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
      console.log(response.data,'fees......................................')
      setFees(response.data);
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  const fetchBatchesForTest = async () => {
    try {
      const response = await getBatchesForTests();
      console.log(response.data,'batch,,,,,,,,,,,,,,,,,,,,,,,,,')
      setBatches(response.data);
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  useEffect(() => {
    fetchBatchesForTest();
    fetchFees();
    fetchStudentsForResult();
    console.log(formData, 'formData.......................')
  }, [formData]);

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
      
      const response = await createEnrollment(formData);
      console.log(response,'create.........................')
  
      if(response.data.message==='Enrollment created successfully'){
        enqueueSnackbar('Enrollment is created successfully', { variant: 'success' });
        setFormData({
          student_id: "",
          batch_id: "",
          date_of_joining: "",
          fee_structure_id: "",
          discount: ""
        });
      }
    } catch (error) {
      if(!formData.student_id || !formData.batch_id || !formData.date_of_joining || !formData.fee_structure_id){
        enqueueSnackbar('All required fields must be provided', { variant: 'error' });
      }else{
        console.error("Error creating Enrollment:", error);
        enqueueSnackbar('Error creating Enrollment', { variant: 'error' });
      }
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
                Enroll Student
              </VuiTypography>


              <VuiBox mb={2} flexBasis="33%">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Select Batch
                  </VuiTypography>
                </VuiBox>
                <NativeSelectDemo batches={batches} onSelectBatch={(value) => setFormData({ ...formData, batch_id: value })} />
              </VuiBox>

              <VuiBox mb={2} flexBasis="33%">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Select Student
                  </VuiTypography>
                </VuiBox>
                <NativeSelectForStudent students={students} onSelectStudents={(value) => setFormData({ ...formData, student_id: value })} />
              </VuiBox>

              <VuiBox mb={2} flexBasis="33%">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Select Fees
                  </VuiTypography>
                </VuiBox>
                <NativeSelectForFees fees={fees} onSelectStudents={(value) => setFormData({ ...formData, fee_structure_id: value })} />
              </VuiBox>
              <VuiBox mb={2} flexBasis="33%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
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
                    type="text"
                    name="date_of_joining"
                    value={formData.date_of_joining}
                    onChange={handleChange}
                    placeholder="Enter Father's Name"
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                      color: "white",
                    })}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2} flexBasis="33%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
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
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    placeholder="Enter Father's Name"
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                      color: "white",
                    })}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2} flexBasis="33%" className="col-3">
              </VuiBox>
              <VuiBox display="flex" alignItems="center"></VuiBox>
              <VuiBox mt={4} mb={1} >
                <VuiButton color="info" fullWidth type="submit">
                  Add
                </VuiButton>
              </VuiBox>

              <VuiBox display="flex" alignItems="center"></VuiBox>

              <VuiBox mt={3} textAlign="center">
                {/* <VuiTypography variant="button" color="text" fontWeight="regular">
              Already have an account?{" "}
              <VuiTypography
                component={Link}
                to="/authentication/sign-in"
                variant="button"
                color="white"
                fontWeight="medium"
              >
                Sign in
              </VuiTypography>
            </VuiTypography> */}
              </VuiBox>
            </VuiBox>
          </GradientBorder>
        </VuiBox>
        {/* <Footer /> */}
      </DashboardLayout>
    </>
  );
}

export default addEnrollment;
