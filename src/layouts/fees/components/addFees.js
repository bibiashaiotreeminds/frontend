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
import { useSnackbar } from 'notistack';
import { getStudentsForResult } from "network/user/pages";
import { getTests } from "network/user/pages";
import { getBatchesForTests } from "network/user/pages";
import { createFees } from "network/user/pages";

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


function addFees() {
  const [rememberMe, setRememberMe] = useState(true);
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);
  const [tests, setTests] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    student: "",
    batch: "",
    amount_to_be_paid: "",
    payment_date: "",
    payment_status: ""
  });

  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [mode, setMode] = useState('manual');

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContainerClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  // const response = await createResultFile(file);
  //   console.log(response, 'file upload................................');
  //   if (response.data) {
  //     setUploadStatus('File uploaded successfully.');
  //     enqueueSnackbar(`'Result is created successfully'`, { variant: 'success' });
  //   } else {
  //     setUploadStatus(`Upload failed: ${response.errorResponse}`);      
  //     enqueueSnackbar('Error creating result', { variant: 'error' });
  //   }
  // };

  const fetchStudentsForResult = async () => {
    try {
      const response = await getStudentsForResult();
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchTestForTest = async () => {
    try {
      const response = await getTests();
      setTests(response.data);
    } catch (error) {
      console.error("Error fetching tests:", error);
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
    fetchBatchesForTest();
    fetchTestForTest();
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
      const response = await createFees(formData);
     
        enqueueSnackbar('Result is created successfully', { variant: 'success' });
      

        setFormData({
          student: "",
          batch: "",
          amount_to_be_paid: "",
          payment_date: "",
          payment_status: ""
        });
        setFile(null);
     
    } catch (error) {
      console.error("Error creating result:", error);
      enqueueSnackbar('Error creating result', { variant: 'error' });
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
              <Link to="/manageFees/" style={{ fontSize: "28px", color: "white" }}>
                <IoChevronBackOutline />

              </Link>
              <VuiTypography
                color="white"
                fontWeight="bold"
                textAlign="center"
                mb="40px"
                mr="960px"
                mt="40px"
                sx={({ typography: { size } }) => ({
                  fontSize: size.lg,
                })}
              >
                Add Fees Details
              </VuiTypography>


              <VuiBox mb={2} flexBasis="33%">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Select Batch
                  </VuiTypography>
                </VuiBox>
                <NativeSelectDemo batches={batches} onSelectBatch={(value) => setFormData({ ...formData, batch: value })} />
              </VuiBox>

              <VuiBox mb={2} flexBasis="33%">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Select Student
                  </VuiTypography>
                </VuiBox>
                <NativeSelectForStudent students={students} onSelectStudents={(value) => setFormData({ ...formData, student: value })} />
              </VuiBox>


              <VuiBox mb={2} flexBasis="33%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    Due
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
                    name="amount_to_be_paid"
                    value={formData.amount_to_be_paid}
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
                    name="payment_date"
                    value={formData.payment_date}
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
                    Payment Status
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
                    name="payment_status"
                    value={formData.payment_status}
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
              <VuiBox mt={3} textAlign="center">
              </VuiBox>
            </VuiBox>
          </GradientBorder>
        </VuiBox>
      </DashboardLayout>
    </>
  );
}

export default addFees;
