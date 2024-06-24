import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { getTestByID, editTestAPI, getBatchesForTests } from "network/user/pages";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import GradientBorder from "examples/GradientBorder";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { IoChevronBackOutline } from "react-icons/io5";
import moment from "moment";

function NativeSelectDemo({ batches, name, value, onChange }) {
  return (
    <div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{
          backgroundColor: "transparent",
          padding: '10px',
          width: "390px",
          height: "40px",
          marginTop: "10px",
          border: "3px solid #4a5568",
          borderRadius: "15px",
          color: "white"
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

function EditTest() {
  const { testId } = useParams();
  const history = useHistory();
  const [data, setData] = useState({
    batch: "",
    testName: "",
    date: "",
    testForm: "",
    totalMarks: "",
    minimumMarks: "",
  });
  const [batches, setBatches] = useState([]);
  const [error, setError] = useState(null);

  const fetchTestByID = async () => {
    try {
      const response = await getTestByID({ testId });
      if (response.data) {
        const fetchedData = response.data;
        fetchedData.date = moment(fetchedData.date, 'YYYY-MM-DD').format('YYYY-MM-DD');
        setData(fetchedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAllBatches = async () => {
    try {
      const response = await getBatchesForTests();
      if (response.data) {
        setBatches(response.data);
      }
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  useEffect(() => {
    fetchTestByID();
    fetchAllBatches();
  }, [testId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { ...data };
      updatedData.date = moment(updatedData.date,'YYYY-MM-DD').format('YYYY-MM-DD');
      console.log(updatedData, 'updatedData before sending to API');

      const response = await editTestAPI({ payload: updatedData, testId });
      // toast("Test updated successfully!");
      console.log(response, 'response from API');

      if (response) {
        history.push("/manageTest");
      }
    } catch (error) {
      console.error("Error updating test:", error);
      // toast("Error updating test!");
    }
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <VuiBox py={3}>
          <GradientBorder borderRadius="lg" minWidth="100%" maxWidth="100%">
            <VuiBox
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
                Edit Test
              </VuiTypography>
              <VuiBox mb={2} flexBasis="33%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Batch Name
                  </VuiTypography>
                </VuiBox>
                <NativeSelectDemo
                  name="batch"
                  value={data.batch}
                  batches={batches}
                  onChange={handleChange}
                />
              </VuiBox>
              <VuiBox mb={2} flexBasis="31%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Test Name
                  </VuiTypography>
                </VuiBox>
                <GradientBorder minWidth="100%" borderRadius="lg" padding="1px">
                  <VuiInput
                    type="text"
                    name="testName"
                    value={data.testName}
                    onChange={handleChange}
                    sx={{ fontSize: "sm", color: "white" }}
                  />
                </GradientBorder>
              </VuiBox>

              <VuiBox mb={2} flexBasis="33%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Date
                  </VuiTypography>
                </VuiBox>
                <GradientBorder minWidth="100%" borderRadius="lg" padding="1px">
                  <VuiInput
                    type="date"
                    name="date"
                    value={data.date}
                    onChange={handleChange}
                    sx={{ fontSize: "sm", color: "white" }}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2} flexBasis="33%" className="col-3">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Test Form
                  </VuiTypography>
                </VuiBox>
                <GradientBorder minWidth="100%" borderRadius="lg" padding="1px">
                  <VuiInput
                    type="text"
                    name="testForm"
                    value={data.testForm}
                    onChange={handleChange}
                    sx={{ fontSize: "sm", color: "white" }}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2} flexBasis="33%" className="col-3">
              </VuiBox>
              <VuiBox mb={2} flexBasis="33%" className="col-3">
              </VuiBox>
              <VuiBox mt={4} mb={1}>
                <VuiButton color="info" fullWidth type="submit">
                  Edit
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

export default EditTest;
