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

/** 
  All of the routes for the Vision UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Vision UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Student from "layouts/billing";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Vision UI Dashboard React icons
import { IoRocketSharp } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { IoBuild } from "react-icons/io5";
import { BsCreditCardFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import addBatch from "layouts/tables/addBatch/addBatch";
import editBatch from "layouts/tables/addBatch/editBatch";
import addStudent from "layouts/billing/managestudent/addStudent";
import editStudent from "layouts/billing/managestudent/editStudent";
import DeleteStudent from "layouts/billing/managestudent/deleteStudent";
import Enrollment from "layouts/enrollment";
import addEnrollment from "layouts/enrollment/components/addenrollment";
import editEnrollment from "layouts/enrollment/components/editEnrollment";
import Teachers from "layouts/teachers";
import addTeachers from "layouts/teachers/components/addTeachers";
import editTeachers from "layouts/teachers/components/editTeachers";
import Fees from "layouts/fees";
import editFees from "layouts/fees/components/editFees";
import TeachersAttendence from "layouts/teachersAttendence";
import addFees from "layouts/fees/components/addFees";
import ViewAttendence from "layouts/teachers/components/ViewAttendence";
import StudentAttendence from "layouts/studentAttendence";
import editAttendence from "layouts/studentAttendence/component/editAttendence";
import addTeachersAttendence from "layouts/teachersAttendence/components/addAttendence";
import editAttendenceStudent from "layouts/teachersAttendence/components/editAttendenceStudent";
import addStudentAttendence from "layouts/studentAttendence/component/addStudentAttendence";
import editStudentAttendence from "layouts/studentAttendence/component/editAttendence";
import Test from "layouts/test";
import addTest from "layouts/test/components/addTest";
import editTest from "layouts/test/components/editTest";
import Result from "layouts/result";
import resultDisplay from "layouts/result/components/resultDisplay";
import addResult from "layouts/result/components/addResult";
import editResult from "layouts/result/components/editResult";
import Students from "layouts/tables/student";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    component: Dashboard,
    noCollapse: true,
    roles: ["admin", "staff"],
  },
  {
    type: "collapse",
    name: "Manage Batches",
    key: "batches",
    route: "/batches/",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Tables,
    noCollapse: true,
    roles: ["admin"],
  },
  {
    key: "batches",
    route: "/batches/add",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: addBatch,
    noCollapse: true,
    roles: ["admin"],
  },
  {
    key: "batches",
    route: "/batches/edit/:batchId",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: editBatch,
    noCollapse: true,
    roles: ["admin"],
  },
  {
    type: "collapse",
    name: "Manage Students",
    key: "manageStudents",
    route: "/manageStudents",
    icon: <BsCreditCardFill size="15px" color="inherit" />,
    component: Students,
    noCollapse: true,
    roles: ["admin"],
  },
  {
    key: "manageStudents",
    route: "/manageStudents/add",
    icon: <BsCreditCardFill size="15px" color="inherit" />,
    component: addStudent,
    noCollapse: true,
    roles: ["admin"],
  },
  {
    key: "manageStudents",
    route: "/manageStudents/edit/:studentId",
    icon: <BsCreditCardFill size="15px" color="inherit" />,
    component: editStudent,
    noCollapse: true,
    roles: ["admin"],
  },
  {
    key: "manageStudents",
    route: "/manageStudents/delete/",
    icon: <BsCreditCardFill size="15px" color="inherit" />,
    component: DeleteStudent,
    noCollapse: true,
    roles: ["admin"],
  },
  {
    type: "collapse",
    name: "Manage Enrollment",
    key: "manageEnrollment",
    route: "/manageEnrollment",
    icon: <BsCreditCardFill size="15px" color="inherit" />,
    component: Enrollment,
    noCollapse: true,
    roles: ["admin"],
  },
  {
    key: "manageEnrollment",
    route: "/manageEnrollment/add",
    icon: <BsCreditCardFill size="15px" color="inherit" />,
    component: addEnrollment,
    noCollapse: true,
    roles: ["admin"],
  },
  {
    key: "manageEnrollment",
    route: "/manageEnrollment/edit/:enrollmentId",
    icon: <BsCreditCardFill size="15px" color="inherit" />,
    component: editEnrollment,
    noCollapse: true,
    roles: ["admin"],
  },
  {
    type: "collapse",
    name: "Manage Fees",
    key: "manageFees",
    route: "/manageFees",
    icon: <BsCreditCardFill size="15px" color="inherit" />,
    component: Fees,
    noCollapse: true,
    roles: ["admin"],
  },
  {
    key: "manageFees",
    route: "/manageFees/add/",
    icon: <BsCreditCardFill size="15px" color="inherit" />,
    component: addFees,
    noCollapse: true,
    roles: ["admin"],
  },
  {
    key: "manageFees",
    route: "/manageFees/edit/:FeeCollectionId",
    icon: <BsCreditCardFill size="15px" color="inherit" />,
    component: editFees,
    noCollapse: true,
    roles: ["admin"],
  },
 {
    type: "collapse",
    name: "Manage Teachers",
    key: "manageTeachers",
    route: "/manageTeachers",
    icon: <IoBuild size="15px" color="inherit" />,
    component: Teachers,
    noCollapse: true,
    roles: ["admin"],
  },{
    key: "manageTeachers",
    route: "/manageTeachers/add/",
    icon: <IoBuild size="15px" color="inherit" />,
    component: addTeachers,
    noCollapse: true,
    roles: ["admin"],
  },{
    key: "manageTeachers",
    route: "/manageTeachers/edit/:userId",
    icon: <IoBuild size="15px" color="inherit" />,
    component: editTeachers,
    noCollapse: true,
    roles: ["admin"],
  },
  {
    type: "collapse",
    name: "Student's Attendence",
    key: "studentAttendence",
    route: "/studentAttendence",
    icon: <IoBuild size="15px" color="inherit" />,
    component: StudentAttendence,
    noCollapse: true,
    roles: ["staff"],
  },
  {
    key: "studentAttendence",
    route: "/studentAttendence/add",
    icon: <IoBuild size="15px" color="inherit" />,
    component: addStudentAttendence,
    noCollapse: true,
    roles: ["staff"],
  },
  {
    key: "studentAttendence",
    route: "/studentAttendence/edit/:attendenceId",
    icon: <IoBuild size="15px" color="inherit" />,
    component: editStudentAttendence,
    noCollapse: true,
    roles: ["staff"],
  },
  {
    type: "collapse",
    name: "Manage Test",
    key: "manageTest",
    route: "/manageTest",
    icon: <IoBuild size="15px" color="inherit" />,
    component: Test,
    noCollapse: true,
    roles: ["staff"],
  },
  {
    key: "manageTest",
    route: "/manageTest/add",
    icon: <IoBuild size="15px" color="inherit" />,
    component: addTest,
    noCollapse: true,
    roles: ["staff"],
  },
  {
    key: "manageTest",
    route: "/manageTest/edit/:testId",
    icon: <IoBuild size="15px" color="inherit" />,
    component: editTest,
    noCollapse: true,
    roles: ["staff"],
  },
  {
    type: "collapse",
    name: "Manage Result",
    key: "manageResult",
    route: "/manageResult",
    icon: <IoBuild size="15px" color="inherit" />,
    component: Result,
    noCollapse: true,
    roles: ["staff"],
  },
  {
    key: "manageResult",
    route: "/manageResult/add/",
    icon: <IoBuild size="15px" color="inherit" />,
    component: addResult,
    noCollapse: true,
    roles: [ "staff"],
  },
  {
    key: "manageResult",
    route: "/manageResult/edit/:resultId",
    icon: <IoBuild size="15px" color="inherit" />,
    component: editResult,
    noCollapse: true,
    roles: ["staff"],
  },
  {
    key: "manageResult",
    route: "/manageResult/showResult/",
    icon: <IoBuild size="15px" color="inherit" />,
    component: resultDisplay,
    noCollapse: true,
    roles: ["staff"],
  },
  { type: "title", title: "", key: "account-pages" },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   route: "/profile",
  //   icon: <BsFillPersonFill size="15px" color="inherit" />,
  //   component: helper,
  //   noCollapse: true,
  //   roles: ["admin","staff"],
  // },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   route: "/authentication/sign-in",
  //   icon: <IoIosDocument size="15px" color="inherit" />,
  //   component: SignIn,
  //   noCollapse: true,
  //   roles: ["admin", "staff"]
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   route: "/authentication/sign-up",
  //   icon: <IoRocketSharp size="15px" color="inherit" />,
  //   component: SignUp,
  //   noCollapse: true,
  //   roles: ["admin", "staff"],
  // },
];

export default routes;
