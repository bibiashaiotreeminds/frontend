import { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import GradientBorder from "examples/GradientBorder";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { IoChevronBackOutline } from "react-icons/io5";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

function EditTeachers() {
  const { userId } = useParams();
  const history = useHistory();
  const [teacherData, setTeacherData] = useState({
    name: "",
    qualification: "",
    experience: "",
    address: "",
    contractType: "",
    subject: "",
    email: "",
    password: "",
    image: null,
    usertype: "",
    status: ""
  });

  useEffect(() => {
    // Fetch teacher data when component mounts
    const fetchTeacherData = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/api/manage-teacher/get-user-by-id/${userId}`);
        setTeacherData(response.data);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };

    fetchTeacherData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacherData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTeacherData((prevData) => ({
          ...prevData,
          image: reader.result,
        }));
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${window.location.origin}/api/manage-teacher/update-user/${userId}`, teacherData);
      history.push("/manageTeachers");
    } catch (error) {
      console.error("Error updating teacher data:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <GradientBorder borderRadius={borders.borderRadius.form} minWidth="100%" maxWidth="100%">
          <VuiBox
            component="form"
            onSubmit={handleFormSubmit}
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
            <Link to="/manageTeachers" style={{ fontSize: "28px", color: "white" }}>
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
              Edit Teacher
            </VuiTypography>
            <VuiBox mb={2} flexBasis="33%" className="col-3">
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" fontWeight="medium" color="white">
                  Upload picture
                </VuiTypography>
              </VuiBox>
              <div
                id="fileInputContainer"
                onClick={handleContainerClick}
                style={{
                  fontSize: "4em",
                  width: "150px",
                  height: "150px",
                  border: "3px solid #4a5568",
                  borderRadius: "20px",
                  textAlign: "center",
                  background: "#030c1d",
                  position: "relative",
                  cursor: "pointer",
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
                {teacherData.image && (
                  <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                    <img
                      src={teacherData.image}
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
            <VuiBox mb={2} flexBasis="66%" className="col-3">
            </VuiBox>
            <VuiBox mb={2} flexBasis="33%" className="col-3">
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Teacher's Name
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
                  value={teacherData.name}
                  onChange={handleInputChange}
                  placeholder="Enter Teacher's Name"
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
                  Qualification
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
                  name="qualification"
                  value={teacherData.qualification}
                  onChange={handleInputChange}
                  placeholder="Enter Qualification"
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
                  Experience
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
                  name="experience"
                  value={teacherData.experience}
                  onChange={handleInputChange}
                  placeholder="Enter Experience"
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
                  value={teacherData.address}
                  onChange={handleInputChange}
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
                  Contract Type
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
                  name="contractType"
                  value={teacherData.contractType}
                  onChange={handleInputChange}
                  placeholder="Enter Contract Type"
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
                  Subject
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
                  name="subject"
                  value={teacherData.subject}
                  onChange={handleInputChange}
                  placeholder="Enter Subject"
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
                  value={teacherData.email}
                  onChange={handleInputChange}
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
                  value={teacherData.password}
                  onChange={handleInputChange}
                  placeholder="Enter Password"
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
                  User Type
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
                  value={teacherData.usertype}
                  onChange={handleInputChange}
                  placeholder="Enter Password"
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
                  Status
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
                  value={teacherData.status}
                  onChange={handleInputChange}
                  placeholder="Enter Password"
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                    color: "white",
                  })}
                />
              </GradientBorder>
            </VuiBox>
            <VuiBox mb={2} flexBasis="66%" className="col-3">
            </VuiBox>
            <VuiBox mt={4} mb={1}>
              <VuiButton color="info" fullWidth type="submit">
                Update Teacher
              </VuiButton>
            </VuiBox>
            <VuiBox mt={3} textAlign="center"></VuiBox>
          </VuiBox>
        </GradientBorder>
      </VuiBox>
    </DashboardLayout>
  );
}

export default EditTeachers;
