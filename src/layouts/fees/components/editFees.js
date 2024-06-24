import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import GradientBorder from "examples/GradientBorder";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useSnackbar } from 'notistack';
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import { getFeesByID, getStudentsForResult, getBatchesForTests, updateFees } from "network/user/pages";
import { editFees } from "network/user/pages";

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

function EditFees() {
  const { FeeCollectionId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    batch: "",
    student: "",
    amount_to_be_paid: "",
    payment_date: "",
    payment_status: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const batchResponse = await getBatchesForTests();
        setBatches(batchResponse.data);

        const studentResponse = await getStudentsForResult();
        setStudents(studentResponse.data);

        const feeResponse = await getFeesByID(FeeCollectionId);
        setFormData(feeResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [FeeCollectionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await editFees({payload:formData, FeeCollectionId});
      console.log(response.data, 'update success');
      enqueueSnackbar('Fees updated successfully', { variant: 'success' });
    } catch (error) {
      console.error("Error updating fees:", error);
      enqueueSnackbar('Error updating fees', { variant: 'error' });
    }
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <VuiBox py={3}>
          <GradientBorder borderRadius={borders.borderRadius.form} minWidth="100%" maxWidth="100%">
            <VuiBox
              component="form"
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
                Update Fees Details
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
              <VuiBox mb={2} flexBasis="33%">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Amount to be Paid
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
                    placeholder="Enter amount to be paid"
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                      color: "white",
                    })}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2} flexBasis="33%">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Payment Date
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
                    placeholder="Enter payment date"
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                      color: "white",
                    })}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2} flexBasis="33%">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
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
                    placeholder="Enter payment status"
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                      color: "white",
                    })}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2} flexBasis="33%">
              </VuiBox>
              <VuiBox display="flex" alignItems="center"></VuiBox>
              <VuiBox mt={4} mb={1}>
                <VuiButton color="info" fullWidth type="submit">
                  Update
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

export default EditFees;

