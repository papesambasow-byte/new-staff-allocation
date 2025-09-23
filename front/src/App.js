import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import StaffAllocation from "./pages/StaffAllocation";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import ListUsers from "./pages/ListUsers";
import UserEdit from "./pages/UserEdit";
import UserAdd from "./pages/UserAdd";
import DataLogs from "./pages/DataLogs";
import VoiceLogs from "./pages/VoiceLogs";
import VoiceReport from "./pages/VoiceReport";
import Upload from "./pages/Upload";
import DataReport from "./pages/DataReport";
import UpdateResetPassword from "./components/UpdateResetPassword";
import UpdatePassword from "./components/UpdatePassword";
import ResetPassword from "./components/ResetPassword";
import LevelLists from "./pages/LevelLists";
import LevelAdd from "./pages/LevelAdd";
import LevelEdit from "./pages/LevelEdit";
import EmailAdd from "./pages/EmailAdd";
import EmailEdit from "./pages/EmailEdit";
import ListEmail from "./pages/ListEmail";
import ListDepartment from "./pages/ListDepartment";
import AddDepartment from "./pages/AddDepartment";
import EditDepartment from "./pages/EditDepartment";
import InActiveUsers from "./pages/InActiveUsers";
import DepartmentActivateList from "./pages/DepartmentActivateList";
import EmailActivate from "./pages/EmailActivate";

// users route
import VoiceReports from "./userPages/VoiceReports";
import DataReports from "./userPages/DataReports";
import VoiceLog from "./userPages/VoiceLog";
import Department from "./userPages/Department";
import DataLog from "./userPages/DataLog";
import Level from "./userPages/Level";
import StaffList from "./userPages/StaffList";
import Email from "./userPages/Email";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forget_password" element={<ResetPassword />} />
          <Route path="/reset-password/:token" element={<UpdatePassword />} />
          <Route
            path="/updatePassword"
            element={<UpdateResetPassword />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/staffAllocation" element={<StaffAllocation />} />
          <Route path="/listUsers" element={<ListUsers />} />
          <Route path="/staffAllocation/add" element={<AddUser />} />
          <Route path="/listUsers/add" element={<UserAdd />} />
          <Route path="/staffAllocation/edit/:id" element={<EditUser />} />
          <Route path="/listUsers/edit/:id" element={<UserEdit />} />
          <Route path="/dataLogs" element={<DataLogs />} />
          <Route path="/voiceLogs" element={<VoiceLogs />} />
          <Route path="/voiceReport" element={<VoiceReport />} />
          <Route path="/dataReport" element={<DataReport />} />
          <Route path="/staffAllocation/add1" element={<Upload />} />
          <Route path="/levelDataList/add" element={<LevelAdd />} />
          <Route path="/levelDataList/edit/:id" element={<LevelEdit />} />
          <Route path="/levelDataList" element={<LevelLists />} />
          <Route path="/listEmail" element={<ListEmail />} />
          <Route path="/listEmail/edit/:id" element={<EmailEdit />} />
          <Route path="/listEmail/add" element={<EmailAdd />} />
          <Route path="/listDepartment" element={<ListDepartment />} />
          <Route path="/listDepartment/add" element={<AddDepartment />} />
          <Route path="/listDepartment/edit/:id" element={<EditDepartment />} />
          <Route path="/inActiveUsers" element={<InActiveUsers />} />
          <Route path="/departmentActivateList" element={<DepartmentActivateList />} />
          <Route path="/emailActivate" element={<EmailActivate />} />
      
          {/* user route */}
          <Route path="/voiceReports" element={<VoiceReports />} />
          <Route path="/dataReports" element={<DataReports />} />
          <Route path="/department" element={<Department />} />
          <Route path="/voiceLog" element={<VoiceLog />} />
          <Route path="/dataLog" element={<DataLog />} />
          <Route path="/level" element={<Level />} />
          <Route path="/staffList" element={<StaffList />} />
          <Route path="/email" element={<Email />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
