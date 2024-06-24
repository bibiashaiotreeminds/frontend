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
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import team1 from "assets/images/avatar1.png";
import team2 from "assets/images/avatar2.png";
import team3 from "assets/images/avatar3.png";
import team4 from "assets/images/avatar4.png";
// Images
import profile1 from "assets/images/profile-1.png";
import profile2 from "assets/images/profile-2.png";
import profile3 from "assets/images/profile-3.png";
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import Footer from "examples/Footer";
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import Welcome from "./components/Welcome/index";
import CarInformations from "./components/CarInformations";

function Overview() {
  return (
    <DashboardLayout>
    
      <VuiBox mt={5} mb={3}>
        
      </VuiBox>
       
        <Grid item xs={12} xl={9}>
          <Card>
            <VuiBox display="flex" flexDirection="column" height="100%">
              <VuiBox display="flex" flexDirection="column" mb="24px">
                <VuiTypography color="white" variant="lg" fontWeight="bold" mb="6px">
                  Details
                </VuiTypography>
                <VuiTypography color="text" variant="button" fontWeight="regular">
                  Alpha Batch 
                </VuiTypography>
              </VuiBox>
             <Grid container spacing={3}>
                <Grid item xs={12} md={6} xl={4}>
                  <DefaultProjectCard
                    image={team2}
                    label="alex@gmail.com"
                    title="Alex Braganza"
                    description="Father's Name: Luios Braganza.
                    Phone: 9876543212"
                
                    action={{
                      type: "internal",
                      route: "/pages/profile/profile-overview",
                      // color: "white",
                      // label: "VIEW ALL",
                    }}
                    // authors={[
                    //   { image: team1, name: "Elena Morison" },
                    //   { image: team2, name: "Ryan Milly" },
                    //   { image: team3, name: "Nick Daniel" },
                    //   { image: team4, name: "Peterson" },
                    // ]}
                  />
           
                </Grid>
              
               
              </Grid>
            </VuiBox>
          </Card>
    
      </Grid>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
