import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import VuiButton from "components/VuiButton";
import ManageTeachers from "./data/teacherTableData";

function Teachers() {
  const { columns, rows } = ManageTeachers();
console.log(columns)
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="32px">
        <VuiTypography variant="lg" fontWeight="bold" color="white">
          Teachers
        </VuiTypography>
        <Link to="/manageTeachers/add/">
          <VuiButton variant="contained" color="info">
            Add Teacher Details
          </VuiButton>
        </Link>
      </VuiBox>
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
              <VuiTypography variant="lg" color="white">
                Teachers
              </VuiTypography>
            </VuiBox>
            <VuiBox
              sx={{
                "& th": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                      `${borderWidth[1]} solid ${grey[700]}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </VuiBox>
          </Card>
        </VuiBox>
        {/* <ToastContainer/> */}
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Teachers;
