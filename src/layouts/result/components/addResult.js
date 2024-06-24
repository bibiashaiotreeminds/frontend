import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createResult, getBatchesForTests, getTests, getStudentsForResult, createResultFile } from "network/user/pages";
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
import { IoChevronBackOutline } from "react-icons/io5";
import { useSnackbar } from 'notistack';

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
          <option key={batch._id} value={batch._id} style={{ backgroundColor: "transparent", color: "black"}}>
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

function NativeSelectForTest({ tests, onSelectTests }) {
  const handleChange = (e) => {
    onSelectTests(e.target.value);
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
        {tests?.map((test) => (
          <option key={test._id} value={test._id} style={{ backgroundColor: "transparent", color: "black" }}>
            {test.testName}
          </option>
        ))}
      </select>
    </div>
  );
}

function AddResult() {
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
  const [uploadStatus, setUploadStatus] = useState('');
  const [mode, setMode] = useState('manual'); 

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file to upload.');
      return;
    }

    const response = await createResultFile(file);
    console.log(response, 'file upload................................');
    if (response.data) {
      setUploadStatus('File uploaded successfully.');
      enqueueSnackbar(`'Result is created successfully'`, { variant: 'success' });
    } else {
      setUploadStatus(`Upload failed: ${response.errorResponse}`);      
      enqueueSnackbar('Error creating result', { variant: 'error' });
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
  }, []);

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
      const response = await createResult(formData);
      if (response.data.message === 'Result created successfully') {
        enqueueSnackbar('Result is created successfully', { variant: 'success' });
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
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiTypography color="white" fontWeight="bold" textAlign="center" mb="20px" sx={({ typography: { size } }) => ({ fontSize: size.lg })}>
          Choose Mode
        </VuiTypography>
        <VuiBox display="flex" justifyContent="center" mb={3}>
          <VuiButton onClick={() => setMode('manual')} color={mode === 'manual' ? 'info' : 'secondary'} variant="gradient" sx={{ mx: 1 }}>
            Manual Entry
          </VuiButton>
          <VuiButton onClick={() => setMode('file')} color={mode === 'file' ? 'info' : 'secondary'} variant="gradient" sx={{ mx: 1 }}>
            File Upload
          </VuiButton>
        </VuiBox>

        {mode === 'file' ? (
          <GradientBorder borderRadius={borders.borderRadius.form} minWidth="100%" maxWidth="100%">
            <VuiBox
              component="form"
              role="form"
              borderRadius="inherit"
              p="45px"
              sx={({ palette: { secondary } }) => ({ backgroundColor: secondary.focus })}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              onSubmit={handleUpload}
            >
              <VuiTypography color="white" fontWeight="bold" textAlign="center" mb="40px" sx={({ typography: { size } }) => ({ fontSize: size.lg })}>
                Upload Result File
              </VuiTypography>

              <VuiBox mb={2} flexBasis="33%">
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Upload Result File
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
                    type="file"
                    onChange={handleFileChange}
                    sx={({ typography: { size } }) => ({ fontSize: size.sm, borderRadius: borders.borderRadius.lg })}
                    color="white"
                    placeholder="Choose File"
                  />
                </GradientBorder>
              </VuiBox>

              <VuiBox mt={4} mb={1}>
                <VuiButton color="info" type="button" onClick={handleUpload} fullWidth>
                  Upload
                </VuiButton>
              </VuiBox>
              {uploadStatus && (
                <VuiTypography color="white" mt={2}>
                  {uploadStatus}
                </VuiTypography>
              )}
            </VuiBox>
          </GradientBorder>
        ) : (
          <GradientBorder borderRadius={borders.borderRadius.form} minWidth="100%" maxWidth="100%">
            <VuiBox
              component="form"
              role="form"
              borderRadius="inherit"
              p="45px"
              sx={({ palette: { secondary } }) => ({ backgroundColor: secondary.focus })}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              onSubmit={handleSubmit}
            >
              <VuiTypography color="white" fontWeight="bold" textAlign="center" mb="40px" sx={({ typography: { size } }) => ({ fontSize: size.lg })}>
                Add Result
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
                    Select Test
                  </VuiTypography>
                </VuiBox>
                  <NativeSelectForTest tests={tests} onSelectTests={(value) => setFormData({ ...formData, testName: value })} />
              </VuiBox>

              <VuiBox mb={2}>
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Marks Scored
                  </VuiTypography>
                </VuiBox>
                <GradientBorder
                  minWidth="355px"
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
                    sx={({ typography: { size } }) => ({ fontSize: size.sm, borderRadius: borders.borderRadius.lg })}
                    color="white"
                    placeholder="Marks Scored"
                  />
                </GradientBorder>
              </VuiBox>

              <VuiBox mb={2}>
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Result
                  </VuiTypography>
                </VuiBox>
                <GradientBorder
                  minWidth="355px"
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
                    sx={({ typography: { size } }) => ({ fontSize: size.sm, borderRadius: borders.borderRadius.lg })}
                    color="white"
                    placeholder="Result"
                  />
                </GradientBorder>
              </VuiBox>

              <VuiBox mb={2}>
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Remarks
                  </VuiTypography>
                </VuiBox>
                <GradientBorder
                  minWidth="355px"
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
                    sx={({ typography: { size } }) => ({ fontSize: size.sm, borderRadius: borders.borderRadius.lg })}
                    color="white"
                    placeholder="Remarks"
                  />
                </GradientBorder>
              </VuiBox>

              <VuiBox mb={2}>
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Subject Topic
                  </VuiTypography>
                </VuiBox>
                <GradientBorder
                  minWidth="355px"
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
                    sx={({ typography: { size } }) => ({ fontSize: size.sm, borderRadius: borders.borderRadius.lg })}
                    color="white"
                    placeholder="Subject Topic"
                  />
                </GradientBorder>
              </VuiBox>

              <VuiBox mt={4} mb={1}>
                <VuiButton color="info" type="submit" fullWidth>
                  Submit
                </VuiButton>
              </VuiBox>
            </VuiBox>
          </GradientBorder>
        )}
      </VuiBox>
    </DashboardLayout>
  );
}

export default AddResult;
