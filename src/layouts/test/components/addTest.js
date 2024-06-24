import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { createTest, getBatchesForTests } from "network/user/pages";
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
          width: "390px",
          height: "40px",
          marginTop: "10px",
          border: "3px solid #4a5568",
          borderRadius: "15px",
         color:"white"
        }}
      >
        {batches.map((batch) => (
          <option key={batch._id} value={batch._id} style={{ backgroundColor: "transparent", color: "black"}}>
            {batch.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function AddTest() {
  const [batches, setBatches] = useState([]);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    batch: "",
    testName: "",
    date: "",
    testForm: "",
  });

  const fetchBatchesForTest = async () => {
    try {
      const response = await getBatchesForTests();
      setBatches(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchBatchesForTest();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.batch || !data.testName || !data.date || !data.testForm) {
      console.log(data)
      // toast("Please fill all mandatory fields.");
      return;
    }
    try {
      await createTest(data);
      // toast("Test Created successfully!");
      setData({
        batch: "",
        testName: "",
        date: "",
        testForm: "",
      });
      
    } catch (error) {
      console.error("Error adding test:", error);
      // toast(error.message || "Failed to create test!");
    }
  };

  const handleOnChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <GradientBorder borderRadius={borders.borderRadius.form} minWidth="100%" maxWidth="100%">
          <VuiBox
            onSubmit={handleSubmit}
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
          >
            <Link to="/manageTest/" style={{ fontSize: "28px", color: "white" }}>
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
              Add Test
            </VuiTypography>
            <VuiBox mb={2} flexBasis="%" className="col-3">
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Batch Name
                  <NativeSelectDemo
                    batches={batches}
                    onSelectBatch={(selectedBatch) => setData((prevState) => ({ ...prevState, batch: selectedBatch }))}
                  />
                </VuiTypography>
              </VuiBox>
            </VuiBox>
            <VuiBox mb={2} flexBasis="31%" className="col-3">
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Test Name
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
                  name="testName"
                  value={data.testName}
                  onChange={handleOnChange}
                  type="text"
                  placeholder="Enter Test Name"
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
                  Test Date
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
                  value={data.date}
                  onChange={handleOnChange}
                  type="date"
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
                  Test Form
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
                  name="testForm"
                  value={data.testForm}
                  onChange={handleOnChange}
                  type="text"
                  placeholder="Enter Test Form"
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                    color: "white",
                  })}
                />
              </GradientBorder>
            </VuiBox>
            <VuiBox mb={2} flexBasis="33%" className="col-3"></VuiBox>
            <VuiBox mb={2} flexBasis="33%" className="col-3"></VuiBox>
            <VuiBox display="flex" alignItems="center"></VuiBox>
            <VuiBox mt={4} mb={1}>
              <VuiButton color="info" fullWidth type="submit">
                Add
              </VuiButton>
            </VuiBox>
          </VuiBox>
        </GradientBorder>
      </VuiBox>
    </DashboardLayout>
  );
}

export default AddTest;
