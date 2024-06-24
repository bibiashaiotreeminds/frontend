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

import { useEffect, useState } from "react";

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
import { useSnackbar } from "notistack";
import { getStudentByID } from "network/user/pages";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function editStudent() {
  const { studentId } = useParams();
  const [rememberMe, setRememberMe] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    name: "",
    standard: "",
    schoolName: "",
    address: "",
    email: "",
    password: "",
    fatherName: "",
    fatherPhoneNumber: "",
    motherName: "",
    motherPhoneNumber: "",
    mentor: "",
    image: null,
  });

  const fetchStudentByID = async () => {
    try {
      console.log(studentId,'studentId........................................................')
      const response = await getStudentByID( studentId);
      console.log(response,'enrollment......................................................')
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching enrollment:", error);
    }
  };

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

  useEffect(() => {
    fetchStudentByID()
  }, [studentId]);

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
      const response = await editStudent({ payload:formData, studentId});
      console.log(response,'editStudent.............................')
      if (response.data) {
        enqueueSnackbar('Student updated successfully', { variant: 'success' });
      } 
    } catch (error) {
        console.error("Error updating Student:", error);
        enqueueSnackbar('Error updating Student', { variant: 'error' });
      
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
              <Link to="/ManageStudents/" style={{ fontSize: "28px", color: "white" }}>
                <IoChevronBackOutline />
              </Link>
              <VuiTypography
                color="white"
                fontWeight="bold"
                textAlign="center"
                mb="40px"
                mr="1050px"
                mt="40px"
                sx={({ typography: { size } }) => ({
                  fontSize: size.lg,
                })}
              >
                Add Student
              </VuiTypography>
              <VuiBox mb={2} flexBasis="%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" fontWeight="medium" color="white">
                    Upload your picture
                  </VuiTypography>
                </VuiBox>
                <div 
                  id="fileInputContainer"
                  onClick={handleContainerClick}
                  style={{
                    fontSize:"4em",
                    width: "150px",
                    height: "150px",
                    border: "3px solid #4a5568",
                    borderRadius:"20px",
                    textAlign: "center",
                    background: "#030c1d",
                    position: "relative",
                    cursor: "pointer" 
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    id="fileInput"
                  />
                  <div>+</div>
                  {formData.image && (
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                      <img
                        src={formData.image}
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                </div>
              </VuiBox>
              <VuiBox mb={2} flexBasis="100%" className="col-3"></VuiBox>
              <VuiBox mb={2} flexBasis="33%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Student Name
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Student's Name"
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                      color: "white",
                    })}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2} flexBasis="33%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Father's Name
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
                    name="fatherName"
                    value={formData.fatherName}
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
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Mother's Name
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
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    placeholder="Enter Mother's Name"
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                      color: "white",
                    })}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2} flexBasis="33%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Father's Phone Number
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
                    name="fatherPhoneNumber"
                    value={formData.fatherPhoneNumber}
                    onChange={handleChange}
                    placeholder="Enter Father's Phone Number"
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                      color: "white",
                    })}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2} flexBasis="33%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Mother's Phone Number
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
                    name="motherPhoneNumber"
                    value={formData.motherPhoneNumber}
                    onChange={handleChange}
                    placeholder="Enter Mother's Phone Number"
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                      color: "white",
                    })}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2} flexBasis="33%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Address
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
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter Address"
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                      color: "white",
                    })}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2} flexBasis="33%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    School Name
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
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleChange}
                    placeholder="Enter School Name"
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                      color: "white",
                    })}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2} flexBasis="33%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Standard
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
                    name="standard"
                    value={formData.standard}
                    onChange={handleChange}
                    placeholder="Enter Standard"
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                      color: "white",
                    })}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2} flexBasis="33%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Mentor
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
                    name="mentor"
                    value={formData.mentor}
                    onChange={handleChange}
                    placeholder="Enter Mentor's Name"
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                      color: "white",
                    })}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2} flexBasis="33%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Email
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                      color: "white",
                    })}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2} flexBasis="33%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Password
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Enter Password"
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                      color: "white",
                    })}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2} flexBasis="33%" className="col-3"></VuiBox>
              <VuiBox display="flex" alignItems="center"></VuiBox>
              <VuiBox mt={4} mb={1}>
                <VuiButton color="info" fullWidth type="submit">
                  EDIT
                </VuiButton>
              </VuiBox>
              <VuiBox mt={3} textAlign="center"></VuiBox>
            </VuiBox>
          </GradientBorder>
        </VuiBox>
      </DashboardLayout>
    </>
  );
}

export default editStudent;
