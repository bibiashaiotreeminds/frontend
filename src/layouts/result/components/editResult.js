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
import { getTests, getStudentsForResult, createResult, getBatchesForTests, editResultAPI, getResultById } from "network/user/pages";
import { useSnackbar } from 'notistack';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

function NativeSelectDemo({ batches, name, value, onChange }) {
  // console.log(value, 'formData.batch.name........................')

  return (
    <div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{
          backgroundColor: "transparent",
          padding: "10px",
          width: "350px",
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

function NativeSelectForStudent({ students, name, value, onChange }) {

  return (
    <div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{
          backgroundColor: "transparent",
          padding: "10px",
          width: "350px",
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

function NativeSelectForTest({ tests, name, value, onChange }) {
  const handleChange = (e) => {
    onSelectTests(e.target.value);
  };

  return (
    <div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{
          backgroundColor: "transparent",
          padding: "10px",
          width: "350px",
          height: "40px",
          marginTop: "10px",
          border: "3px solid #4a5568",
          borderRadius: "15px",
          color: "white",
        }}
      >
      {tests?.map((test) => (
          <option key={test._id} value={test._id} style={{ backgroundColor: "transparent", color: "black" }}>
            {test.testName}
          </option>
        ))}
      </select>
    </div>
  );
}

function editResult() {
  const { resultId } = useParams()
  const history = useHistory();
  const [rememberMe, setRememberMe] = useState(true);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);
  const [tests, setTests] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    batch: "",
    student: "",
    testName: "",
    MarksScored: "",
    Result: "",
    Remarks: "",
    SubjectTopic: "",
  });
  const [file, setFile] = useState(null);

  const fetchResultById = async () => {
    try {
      const response = await getResultById({ resultId });
      const { batch, student, testName, MarksScored, Result, Remarks, SubjectTopic } = response.data;
      setFormData({
        batch: batch._id,
        student: student._id,
        testName: testName._id,
        MarksScored,
        Result,
        Remarks,
        SubjectTopic,
      });
      console.log(response.data, "fetchResultById..............................")
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };
  

  const fetchStudentsForResult = async () => {
    try {
      const response = await getStudentsForResult();
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };



  const fetchTestForTest = async () => {
    try {
      const response = await getTests();
      setTests(response.data);
    } catch (error) {
      console.error("Error fetching batches:", error);
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
    fetchResultById();
    fetchBatchesForTest();
    fetchTestForTest();
    fetchStudentsForResult();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await editResultAPI({ resultId, payload: formData });
      console.log(response.data)
      if (response.data.message === 'Result updated successfully') {
        enqueueSnackbar('Result is updated successfully', { variant: 'success' });
        setErrorMessage(response.data.message);
        setFormData({
          batch: "",
          student: "",
          testName: "",
          MarksScored: "",
          Result: "",
          Remarks: "",
          SubjectTopic: "",
        });
        setFile(null);

      } else {
        console.log('Unexpected response status');
        enqueueSnackbar('Error creating result', { variant: 'error' });
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
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
              onSubmit={handleSubmit}
            >
              <Link to="/manageResult/" style={{ fontSize: "28px", color: "white" }}>
                <IoChevronBackOutline />

              </Link>
              <VuiTypography
                color="white"
                fontWeight="bold"
                textAlign="center"
                mb="40px"
                mr="1060px"
                mt="40px"
                sx={({ typography: { size } }) => ({
                  fontSize: size.lg,
                })}
              >
                Edit Result
              </VuiTypography>
              <VuiBox mb={2} flexBasis="%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" fontWeight="medium" color="white">
                    Upload Result file
                  </VuiTypography>
                </VuiBox>

                <div
                  id="fileInputContainer"
                  // onClick={handleContainerClick}
                  style={{
                    fontSize: "4em",
                    width: "150px",
                    height: "150px",
                    border: "3px solid #4a5568",
                    borderRadius: "20px",
                    textAlign: "center",
                    background: "#030c1d",
                    position: "relative",
                    cursor: "pointer"
                  }}>
                  <input
                    type="file"
                    accept="image/*"
                    // onChange={handleImageChange}
                    style={{ display: "none" }}
                    id="fileInput"
                  />
                  <div>
                    +
                  </div>
                  {image && (
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                      <img
                        src={image}
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: "100%",

                          objectFit: "cover"
                        }}
                      />
                    </div>
                  )}
                </div>

              </VuiBox>
              <VuiBox mb={2} flexBasis="100%" className="col-3">


              </VuiBox>
              <VuiBox mb={2} flexBasis="33%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    Batch Name
                    <NativeSelectDemo
                      name="batch"
                      value={formData.batch.name}
                      batches={batches}
                      onChange={handleChange}
                    />
                  </VuiTypography>
                </VuiBox>

              </VuiBox>

              <VuiBox mb={2} flexBasis="33%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    Select Student
                    <NativeSelectForStudent
                      name="student"
                      value={formData.student.name}
                      onChange={handleChange}
                      students={students}

                    />
                  </VuiTypography>
                </VuiBox>

              </VuiBox>
              <VuiBox mb={2} flexBasis="33%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                        Test Name
                    <NativeSelectForTest
                      name="testName"
                      value={formData.testName.testName}
                      onChange={handleChange}
                      tests={tests}

                    />
                  </VuiTypography>
                </VuiBox>

              </VuiBox>
              {/* <VuiBox mb={2} flexBasis="33%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    Test Name
                  </VuiTypography>
                </VuiBox>
                <NativeSelectForTest
                  name="testName"
                  value={formData.testName.testName}
                  onChange={handleChange}
                  tests={tests}
                />
              </VuiBox> */}
              <VuiBox mb={2} flexBasis="33%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    Marks Scored
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
                    type="number"
                    name="MarksScored"
                    value={formData.MarksScored}
                    onChange={handleChange}
                    placeholder="Enter Marks"
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
                    Result
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
                    name="Result"
                    value={formData.Result}
                    onChange={handleChange}
                    placeholder="Enter Result"
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
                    Remarks
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
                    name="Remarks"
                    value={formData.Remarks}
                    onChange={handleChange}
                    placeholder="Enter Remarks"
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
                    Subject Topic
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
                    name="SubjectTopic"
                    value={formData.SubjectTopic}
                    onChange={handleChange}
                    placeholder="Enter Subject Topic"
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                      color: "white",
                    })}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2} flexBasis="33%" className="col-3">
              </VuiBox>
              <VuiBox mb={2} flexBasis="33%" className="col-3">
              </VuiBox>

              <VuiBox display="flex" alignItems="center"></VuiBox>
              <VuiBox mt={4} mb={1} >
                <VuiButton color="info" fullWidth type="submit">
                  Edit Result
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

export default editResult;
