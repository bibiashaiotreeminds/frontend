import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import axios from "axios";
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
import { editBatchAPI } from "network/user/pages";
import { getBatchByID } from "network/user/pages";

function EditBatch() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [subjects, setSubjects] = useState("");
  const [error, setError] = useState("");
  const { batchId } = useParams();
  const history = useHistory();

  useEffect(() => {
    // Fetch batch data by ID when the component mounts
    const fetchBatchData = async () => {
      try {
        const response = await getBatchByID({batchId})
        // const response = await axios.get(`${window.location.origin}/api/manage-batch/get-batch-by-id/${batchId}`);

        const { name, startDate, duration, subjects } = response.data;
        setName(name);
        setStartDate(new Date(startDate).toISOString().split("T")[0]); // Format date for input[type=date]
        setDuration(duration);
        setSubjects(subjects)
      } catch (error) {
        console.error("Error fetching batch data:", error);
        setError("Failed to fetch batch data. Please try again.");
      }
    };

    fetchBatchData();
  }, [batchId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload={
      name,
      startDate,
      duration,
      subjects
    }
    try {
      const response= await editBatchAPI({ batchId, payload:payload});
      if(response.data){
        history.push("/batches/");
      }
      console.log(payload,'response...............................')
    
    } catch (error) {
      console.error("Error fetching batch data:", error);
      setError("Failed to fetch batch data. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <GradientBorder borderRadius={borders.borderRadius.form} minWidth="100%" maxWidth="100%">
          <VuiBox
            component="form"
            role="form"
            onSubmit={handleSubmit}
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
            <Link to="/batches/" style={{ fontSize: "28px", color: "white" }}>
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
              Update Batch
            </VuiTypography>
            <VuiBox mb={2} flexBasis="33%">
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Batch Name
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter batch name"
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                    color: "white",
                  })}
                  required
                />
              </GradientBorder>
            </VuiBox>
            <VuiBox mb={2} flexBasis="33%">
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Duration
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
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Enter duration"
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                    color: "white",
                  })}
                  required
                />
              </GradientBorder>
            </VuiBox>
            <VuiBox mb={2} flexBasis="33%">
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Starting Date
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
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Enter starting date"
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                    color: "white",
                  })}
                  required
                />
              </GradientBorder>
            </VuiBox>
            <VuiBox mb={2} flexBasis="33%">
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
                  type="text"
                  value={subjects}
                  onChange={(e) => setSubjects(e.target.value)}
                  placeholder="Enter starting date"
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                    color: "white",
                  })}
                  required
                />
              </GradientBorder>
            </VuiBox>
            <VuiBox mt={4} mb={1} flexBasis="100%">
              <VuiButton type="submit" color="info" fullWidth>
                UPDATE BATCH
              </VuiButton>
            </VuiBox>
          </VuiBox>
        </GradientBorder>
      </VuiBox>
    </DashboardLayout>
  );
}

export default EditBatch;
