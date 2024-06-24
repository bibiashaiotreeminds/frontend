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
import displayResultTableData from "../data/displayResultTableData";
import { useState } from "react";

function resultDisplay() {
  const { columns, rows } = displayResultTableData;
  const rowLength = rows.length;
  const postsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(rowLength / postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startingIndex = (currentPage - 1) * postsPerPage;
  const endingIndex = startingIndex + postsPerPage;
  const sliceRow = rows.slice(startingIndex, endingIndex);

  return (
    <>
    
      <DashboardLayout>
        <DashboardNavbar />
        <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="32px">
          <VuiTypography variant="lg" fontWeight="bold" color="white"></VuiTypography>
        </VuiBox>
        <VuiBox py={3}>
          <VuiBox mb={3}>
            <Card>
              <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
                <VuiTypography variant="lg" color="white">
                  Result
                </VuiTypography>
              </VuiBox>
              <VuiBox display="flex"  alignItems="center" mb="22px">
                <VuiTypography variant="lg" color="white">
                  Batch:Alpha Batch
                </VuiTypography>
                <VuiTypography variant="lg" color="white" ml="60px">
                  Subject Topic: DSA
                </VuiTypography>
                <VuiTypography variant="lg" color="white" ml="60px">
                  Datet: 10 May 2024
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
                <Table columns={columns} rows={sliceRow} />
               <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index + 1}
      onClick={() => handlePageChange(index + 1)}
      style={{
        padding: "8px 12px",
        margin: "0 5px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: currentPage === index + 1 ? "#007bff" : "transparent",
        color: currentPage === index + 1 ? "#fff" : "#000",
        cursor: "pointer",
        outline: "none",
        transition: "background-color 0.3s",
      }}
    >
      {index + 1}
    </button>
  ))}
</div>

              </VuiBox>
            </Card>
          </VuiBox>
        </VuiBox>
      </DashboardLayout>
    </>
  );
}

export default resultDisplay;
