import axios from "axios";

let baseUrl = "https://tution-management-project-4.onrender.com";

//Batch API
const getBatches = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/manage-batch/get-batch`);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const handleDeleteBatch = async (batchId) => {
    try {
        await axios.delete(`${baseUrl}/api/manage-batch/remove-batch/${batchId}`);
        console.log("Batch deleted successfully");
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};

const createBatch = async (payload) => {
    try {
        const response = await axios.post(`${baseUrl}/api/manage-batch/create-batch`, payload);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const editBatchAPI = async ({ payload, batchId }) => {
    try {
        const response = await axios.put(`${baseUrl}/api/manage-batch/update-batch/${batchId}`, payload);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const getBatchByID = async ({ batchId }) => {
    try {
        const response = await axios.get(`${baseUrl}/api/manage-batch/get-batch-by-id/${batchId}`);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

//student

const getStudent = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/manage-student/get-student`);
      const data = response && response.data;
      return { data };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
        await axios.delete(`${baseUrl}/api/manage-student/remove-student/${studentId}`);
        console.log("Batch deleted successfully");
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};

const createStudent = async (payload) => {
    try {
        const response = await axios.post(`${baseUrl}/api/manage-student/create-student`, payload);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const getStudentByID = async (studentId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/manage-student/get-student-by-id/${studentId}`);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const editStudent = async ({ payload, studentId }) => {
    try {
        const response = await axios.put(`${baseUrl}/api/manage-student/update-student/${studentId}`, payload);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

//Enrollment 
const getEnrollment = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/manage-enrollment/get-enrollment`);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const handleDeleteEnrollment = async (enrollmentId) => {
    try {
        await axios.delete(`${baseUrl}/api/manage-enrollment/remove-enrollment/${enrollmentId}`);
        console.log("User deleted successfully");

    } catch (error) {
        console.error("Error deleting user:", error);
    }
};

const createEnrollment = async (payload) => {
    try {
        const response = await axios.post(`${baseUrl}/api/manage-enrollment/create-enrollment`, payload);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const getEnrollmentByID = async ({ enrollmentId }) => {
    try {
        const response = await axios.get(`${baseUrl}/api/manage-enrollment/get-enrollment-by-id/${enrollmentId}`);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const editEnrollment = async ({ payload, enrollmentId }) => {
    try {
        const response = await axios.put(`${baseUrl}/api/manage-enrollment/update-enrollment/${enrollmentId}`, payload);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

//Fees

const getFees = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/manage-fees/get-fees`);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const handleDeleteFees = async (FeeCollectionId) => {
    try {
        await axios.delete(`${baseUrl}/api/manage-fees/remove-fees/${FeeCollectionId}`);
        console.log("User deleted successfully");

    } catch (error) {
        console.error("Error deleting user:", error);
    }
};

const createFees = async (payload) => {
    try {
        const response = await axios.post(`${baseUrl}/api/manage-fees/create-fees`, payload);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const getFeesByID = async (FeeCollectionId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/manage-fees/get-fees-by-id/${FeeCollectionId}`);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const editFees = async ({ payload, FeeCollectionId }) => {
    try {
        const response = await axios.put(`${baseUrl}/api/manage-fees/update-fees/${FeeCollectionId}`, payload);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

//Teachers API

const createUser = async (payload) => {
    try {
        const response = await axios.post(`${baseUrl}/manage-teacher/create-user`, payload);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}


const handleDeleteTeacher = async (userId) => {
    try {
        await axios.delete(`http://localhost:3001/api/manage-teacher/remove-user/${userId}`);
        console.log("User deleted successfully");
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};



// Test APIs

const getTests = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/manage-test/get-test`);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const deleteTest = async (testId) => {
    try {
        const response = await axios.delete(`${baseUrl}/api/manage-test/remove-test/${testId}`);
        console.log("test deleted successfully");
        const data = response && response.data;
        return { data };
    } catch (error) {
        console.error("Error deleting test:", error);
    }
};

const createTest = async (payload) => {
    try {
        const response = await axios.post(`${baseUrl}/api/manage-test/create-test`, payload);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}


const getBatchesForTests = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/manage-batch/get-batch`);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const editTestAPI = async ({ payload, testId }) => {
    try {
        const response = await axios.put(`${baseUrl}/api/manage-test/update-test/${testId}`, payload);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const getTestByID = async ({ testId }) => {
    try {
        const response = await axios.get(`${baseUrl}/api/manage-test/get-test-by-id/${testId}`);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

//Result API

const createResult = async (payload) => {
    try {
        const response = await axios.post(`${baseUrl}/api/manage-result/create-result`, payload);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const getResult = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/manage-result/get-result`);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const handleDeleteResult = async (resultId) => {
    try {
        await axios.delete(`${baseUrl}/api/manage-result/remove-result/${resultId}`);
        console.log("User deleted successfully");

    } catch (error) {
        console.error("Error deleting user:", error);
    }
};

const getStudentsForResult = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/manage-student/get-student`);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const editResultAPI = async ({ payload, resultId }) => {
    try {
        const response = await axios.put(`${baseUrl}/api/manage-result/update-result/${resultId}`, payload);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const getResultById = async ({ resultId }) => {
    try {
        const response = await axios.get(`${baseUrl}/api/manage-result/get-result-by-id/${resultId}`);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const createResultFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData, 'formData..............................')

    try {
        const response = await axios.post(`${baseUrl}/api/manage-result/create-result-file`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error.response && error.response.data ? error.response.data : "Network Error";
        return { errorResponse };
    }
}

//Student Attendence

const getSubject = async (batchId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/manage-student-attendence/get-Subject/${batchId}`);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const getstudent = async (batchId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/manage-student-attendence/get-student/${batchId}`);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const getAllStudent = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/manage-student-attendence/get-attendence`);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const handleDeleteAttendence = async (attendenceId) => {
    try {
        await axios.delete(`${baseUrl}/api/manage-student-attendence/remove-attendence/${attendenceId}`);
        console.log("User deleted successfully");
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};

const createAttendence = async (payload) => {
    try {
        const response = await axios.post(`${baseUrl}/api/manage-student-attendence/create-attendence`, payload);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const updateAttendence = async ({ attendenceId, payload }) => {
    try {
        const response = await axios.put(`${baseUrl}/api/manage-student-attendence/update-attendence/${attendenceId}`, payload);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}


const getAllBatchesenrolledByStudent = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/manage-student-attendence/get-batch-enrolled`);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

const getAttendenceByID = async (attendenceId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/manage-student-attendence/get-attendence-by-id/${attendenceId}`);
        const data = response && response.data;
        return { data };
    } catch (error) {
        const errorResponse = error && error.data || "Network Error";
        return { errorResponse };
    }
}

export {
    getBatches,
    handleDeleteBatch,
    createBatch,
    editBatchAPI,
    getBatchByID,
    getStudent,
    handleDeleteStudent,
    createStudent,
    editStudent,
    getStudentByID,
    getEnrollment,
    handleDeleteEnrollment,
    createEnrollment,
    getEnrollmentByID,
    editEnrollment,
    getFees,
    createFees,
    handleDeleteFees,
    getFeesByID,
    editFees,
    createUser,
    getTests,
    deleteTest,
    createTest,
    getBatchesForTests,
    editTestAPI,
    getTestByID,
    handleDeleteTeacher,
    createResult,
    getResult,
    handleDeleteResult,
    getStudentsForResult,
    editResultAPI,
    getResultById,
    createResultFile,
    getSubject,
    getstudent,
    getAllStudent,
    handleDeleteAttendence,
    createAttendence,
    getAllBatchesenrolledByStudent,
    getAttendenceByID,
    updateAttendence
};