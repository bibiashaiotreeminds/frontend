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

// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data

import VuiButton from "components/VuiButton";
import { Link } from "react-router-dom";
import ManageStudentAttendence from "./data/MarkAttence";

function StudentAttendence() {
  const { columns, rows } = ManageStudentAttendence();
  console.log(columns, 'column..................................')
  console.log(rows,'rows................................................')

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="32px">
          <VuiTypography variant="lg" fontWeight="bold" color="white"></VuiTypography>
          <Link to="/studentAttendence/add/">
            <VuiButton variant="contained" color="info">
              Add Attendence
            </VuiButton>
          </Link>
        </VuiBox>
        <VuiBox py={3}>
          <VuiBox mb={3}>
            <Card>
              <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
                <VuiTypography variant="lg" color="white">
                  Student
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
        </VuiBox>
      </DashboardLayout>
    </>
  );
}

export default StudentAttendence;
