import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { IoPerson,} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import orange from "../Orange_TM_logo.png";
import axios from "axios";
import moment from "moment";
import { TbReportSearch } from "react-icons/tb";
import { FcApprove,FcDepartment } from "react-icons/fc";
import {
  MdRecordVoiceOver,
  Md4GPlusMobiledata,
  MdOutlineLtePlusMobiledata,
  MdPeopleAlt,
  MdOutlineCall,
  MdOutlinePassword,
  MdOutlineLogin,
  MdDashboardCustomize
} from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { SiLevelsdotfyi } from "react-icons/si";
import { AiOutlineMail } from "react-icons/ai";
import './Side.css'

const Sidebar = () => {
  const [dropdownOpen, setDropdownOpen] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // const toggleDropdown = () => {
  //   setDropdownOpen(!dropdownOpen);
  // };



  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  const currentDate = moment().format("DD-MM-YYYY");
  const date = new Date();
  const current_time =
    date.getHours() +
    ":" +
    " " +
    date.getMinutes() +
    ":" +
    " " +
    date.getSeconds();
  const today = current_time + "  " + currentDate;

// Dashboard
  const handleAuditDashboard = async () => {
    const actor = user.userName;
    const action = "Dashboard sidebar route ";
    const performedDate = today;
    const token = localStorage.getItem("token")
    const authHeader = `Bearer ${token}`

    await axios
      .post("http://172.25.160.235:2402/auditTrail", {
        actor,
        action,
        performedDate
      },
      {
        headers:{
            Authorization:authHeader
        }
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

//   Users
  const handleAuditUsers = async () => {
    const actor = user.userName;
    const action = "users sidebar route ";
    const performedDate = today;
    const token = localStorage.getItem("token")
    const authHeader = `Bearer ${token}`

    await axios
      .post("http://172.25.160.235:2402/auditTrail", {
        actor,
        action,
        performedDate
      },
      {
        headers:{
            Authorization:authHeader
        }
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

// Reset Password
  const handleAuditResetPassword = async () => {
    const actor = user.userName;
    const action = "Reset Password sidebar route ";
    const performedDate = today;
    const token = localStorage.getItem("token")
    const authHeader = `Bearer ${token}`

    await axios
      .post("http://172.25.160.235:2402/auditTrail", {
        actor,
        action,
        performedDate
      },
      {
        headers:{
            Authorization:authHeader
        }
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


// Allocation
  const handleAuditStaffs = async () => {
    const actor = user.userName;
    const action = "Allocation sidebar route ";
    const performedDate = today;
    const token = localStorage.getItem("token")
    const authHeader = `Bearer ${token}`

    await axios
      .post("http://172.25.160.235:2402/auditTrail", {
        actor,
        action,
        performedDate
      },
      {
        headers:{
            Authorization:authHeader
        }
      }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


// Logs
  const handleAuditDataLogs = async () => {
    const actor = user.userName;
    const action = "logs sidebar monthly data route ";
    const performedDate = today;
    const token = localStorage.getItem("token")
    const authHeader = `Bearer ${token}`

    await axios
      .post("http://172.25.160.235:2402/auditTrail", {
        actor,
        action,
        performedDate
      },
      {
        headers:{
            Authorization:authHeader
        }
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


// Voice
  const handleAuditVoiceLogs = async () => {
    const actor = user.userName;
    const action = "logs sidebar monthly voice route ";
    const performedDate = today;
    const token = localStorage.getItem("token")
    const authHeader = `Bearer ${token}`

    await axios
      .post("http://172.25.160.235:2402/auditTrail", {
        actor,
        action,
        performedDate
      },
      {
        headers:{
            Authorization:authHeader
        }
      }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

// Voice Report
  const handleAuditVoiceReport = async () => {
    const actor = user.userName;
    const action = "logs sidebar monthly voice report ";
    const performedDate = today;
    const token = localStorage.getItem("token")
    const authHeader = `Bearer ${token}`

    await axios
      .post("http://172.25.160.235:2402/auditTrail", {
        actor,
        action,
        performedDate
      },
      {
        headers:{
            Authorization:authHeader
        }
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


// Data Report
  const handleAuditDataReport = async () => {
    const actor = user.userName;
    const action = "logs sidebar monthly voice report ";
    const performedDate = today;
    const token = localStorage.getItem("token")
    const authHeader = `Bearer ${token}`

    await axios
      .post("http://172.25.160.235:2402/auditTrail", {
        actor,
        action,
        performedDate
      },
      {
        headers:{
            Authorization:authHeader
        }
      }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

 

  return (
    <div>
      <aside
        className="menu pl-2 has-shadow"
        style={{
          position: "fixed",
          top: 0,
          left: isSidebarOpen ? 0 : "-180px",
          width: isSidebarOpen ? "240px" : "60px",
          height: "100vh",
          background: "#192655",
          zIndex: 1,
          transition: "left 0.3s, width 0.3s"
        }}
      >
        <div>
          <div style={{ marginTop: "10px" }}>
            <p
              to="#"
              className="navbar-item"
              style={{ textDecoration: "none" }}
            >
              <img src={orange} alt="logo" />
              <p
                style={{
                  paddingLeft: "10px",
                  color: "white",
                  paddingTop: "8px",
                  fontSize: "15px",
                  fontWeight: "bold"
                }}
              >
                Employee Allocation
              </p>
            </p>
          </div>
          <hr style={{ color: 'white',  height: '5px' }}/>
          <ul className="menu">

            {/* Dashboard */}
          <li>
              <NavLink
                to={"/dashboard"}
                 activeClassName="active"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "15px",
                  marginLeft:"-10px"
                 
                }}
                onClick={handleAuditDashboard}
              >
                <span className="text-warning" style={{fontSize:"20px", color:"orangered"}}><MdDashboardCustomize /></span>{""} Dashboard
              </NavLink>
            </li>
            </ul>
           {user && user.role === "admin" && (
            <ul className="menu">
            {/* Allocation */}
            
            <li className="mb-1">
                <NavLink
                  to="/allocation"
                  activeClassName="active"
                  className="btn btn-toggle align-items-center rounded collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#allocation-collapse"
                  aria-expanded="false"
                  style={{ color: "white", marginLeft:"-20px" }}
                  
                >
                  <span
                    className="text-warning"
                    style={{ fontSize: "20px", }}
                  >
                    <FcApprove />
                  </span>{""} Allocation
                </NavLink>
                <div
                  className="collapse"
                  id="allocation-collapse"
                  style={{ color: "white" }}
                >
                 <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li>
                      <NavLink
                        to="/staffAllocation"
                        className="link rounded"
                        style={{ color: "white", textDecoration: "none" }}
                        onClick={handleAuditStaffs}
                        activeClassName="active"
                      >
                        <span
                          className="text-success"
                          style={{ fontSize: "25px", color: "orangered" }}
                        >
                          <MdPeopleAlt />
                        </span>{" "}
                        Allocation
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/levelDataList"
                        className="link rounded"
                        style={{ color: "white", textDecoration: "none" }}
                        onClick={handleAuditStaffs}
                        activeClassName="active"
                      >
                        <span
                          className="text-success"
                          style={{ fontSize: "25px", color: "orangered" }}
                        >
                          <SiLevelsdotfyi />
                        </span>{" "}
                        Level
                      </NavLink>
                    </li>

                    

                    <li>
                      <NavLink
                        to="/listDepartment"
                        className="link rounded"
                        style={{ color: "white", textDecoration: "none" }}
                        onClick={handleAuditStaffs}
                        activeClassName="active"
                      >
                        <span
                          className="text-success"
                          style={{ fontSize: "25px", color: "orangered" }}
                        >
                          <FcDepartment />
                        </span>{" "}
                        Department
                      </NavLink>
                    </li>

                    
                    <li>
                      <NavLink
                        to="/departmentActivateList"
                        className="link rounded"
                        style={{ color: "white", textDecoration: "none" }}
                        onClick={handleAuditStaffs}
                        activeClassName="active"
                      >
                        <span
                          className="text-warning"
                          style={{ fontSize: "25px", color: "orangered" }}
                        >
                          <FcDepartment />
                        </span>{" "}
                        Activate Department
                      </NavLink>
                    </li>


                    
                    <li>
                      <NavLink
                        to="/listEmail"
                        className="link rounded"
                        style={{ color: "white", textDecoration: "none" }}
                        onClick={handleAuditStaffs}
                        activeClassName="active"
                      >
                        <span
                          className="text-success"
                          style={{ fontSize: "25px", color: "orangered" }}
                        >
                          <AiOutlineMail />
                        </span>{" "}
                        Email
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/emailActivate"
                        className="link rounded"
                        style={{ color: "white", textDecoration: "none" }}
                        onClick={handleAuditStaffs}
                        activeClassName="active"
                      >
                        <span
                          className="text-warning"
                          style={{ fontSize: "25px", color: "orangered" }}
                        >
                          <AiOutlineMail />
                        </span>{" "}
                        Activate Email
                      </NavLink>
                    </li>
                  </ul>
                </div>
            </li>
         
            {/* Logs */}
            <li className="mb-1">
                <NavLink
                  to="/logs"
                  activeClassName="active"
                  className="btn btn-toggle align-items-center rounded collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#logs-collapse"
                  aria-expanded="false"
                  style={{ color: "white",  marginLeft:"-20px" }}
                >
                  <span
                    className="text-warning"
                    style={{ fontSize: "20px", }}
                  >
                    <MdOutlineLogin />
                  </span>{""} Logs
                </NavLink>
                <div
                  className="collapse"
                  id="logs-collapse"
                  style={{ color: "white" }}
                >
                 <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li>
                      <NavLink
                        to="/dataLogs"
                        className="link rounded"
                        style={{ color: "white", textDecoration: "none" }}
                        onClick ={handleAuditDataLogs}
                        activeClassName="active"
                      >
                        <span
                          className="text-success"
                          style={{ fontSize: "25px", color: "orangered" }}
                        >
                          <Md4GPlusMobiledata />
                        </span>{" "}
                        Data Logs
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/voiceLogs"
                        className="link rounded"
                        style={{ color: "white", textDecoration: "none" }}
                        onClick = {handleAuditVoiceLogs}
                        activeClassName="active"
                      >
                        <span
                          className="text-success"
                          style={{ fontSize: "25px", color: "orangered" }}
                        >
                          <MdRecordVoiceOver />
                        </span>{" "}
                        Voice Logs
                      </NavLink>
                    </li>
                  </ul>
                </div>
            </li>

           {/* Report */}
            <li className="mb-1">
                <NavLink
                  to="/logs"
                  activeClassName="active"
                  className="btn btn-toggle align-items-center rounded collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#reports-collapse"
                  aria-expanded="false"
                  style={{ color: "white",  marginLeft:"-20px" }}
                >
                  <span
                    className="text-warning"
                    style={{ fontSize: "20px", }}
                  >
                    <TbReportSearch />
                  </span>{""} Report
                </NavLink>
                <div
                  className="collapse"
                  id="reports-collapse"
                  style={{ color: "white" }}
                >
                 <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li>
                      <NavLink
                        to="/voiceReport"
                        className="link rounded"
                        style={{ color: "white", textDecoration: "none" }}
                        onClick = {handleAuditVoiceReport}
                        activeClassName="active"
                      >
                        <span
                          className="text-success"
                          style={{ fontSize: "25px", color: "orangered" }}
                        >
                          <MdOutlineCall />
                        </span>{" "}
                        Voice Report
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/dataReport"
                        className="link rounded"
                        style={{ color: "white", textDecoration: "none" }}
                        onClick = {handleAuditDataReport}
                        activeClassName="active"
                      >
                        <span
                          className="text-success"
                          style={{ fontSize: "25px", color: "orangered" }}
                        >
                          <MdOutlineLtePlusMobiledata />
                        </span>{" "}
                        Data Report
                      </NavLink>
                    </li>
                  </ul>
                </div>
            </li>
        
          </ul>
          )}

           {/* Account */}
          <hr  style={{ backgroundColor: 'white'}}/>
          {user && user.role === "admin" && (
            
            <ul className="menu">
            <li className="mb-1">
                <NavLink
                  to="/account"
                  activeClassName="active"
                  className="btn btn-toggle align-items-center rounded collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#account-collapse"
                  aria-expanded="false"
                  style={{ color: "white",  marginLeft:"-20px" }}
                >
                  <span
                    className="text-success"
                    style={{ fontSize: "20px", }}
                  >
                    <BsPersonCircle />
                  </span>{" "}Account
                </NavLink>
                <div
                  className="collapse"
                  id="account-collapse"
                  style={{ color: "white" }}
                >
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li>
                      <NavLink
                        to="/listUsers"
                        className="link rounded"
                        style={{ color: "white", textDecoration: "none" }}
                        onClick={handleAuditUsers}
                        activeClassName="active"
                      >
                        <span
                          className="text-success"
                          style={{ fontSize: "25px", color: "white" }}
                        >
                          <IoPerson />
                        </span>{" "}
                        Users
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/inActiveUsers"
                        className="link rounded"
                        style={{ color: "white", textDecoration: "none" }}
                        onClick={handleAuditUsers}
                        activeClassName="active"
                      >
                        <span
                          className="text-success"
                          style={{ fontSize: "25px", color: "white" }}
                        >
                          <IoPerson />
                        </span>{" "}
                        Inctive Users
                      </NavLink>
                    </li>

                    {/* <li>
                      <NavLink
                        to="/password"
                        className="link rounded"
                        style={{ color: "white", textDecoration: "none" }}
                        onClick={handleAuditResetPassword}
                        activeClassName="active"
                      >
                        <span
                          className="text-success"
                          style={{ fontSize: "25px", color: "orangered" }}
                        >
                          <MdOutlinePassword />
                        </span>{" "}
                        Reset Password
                      </NavLink>
                    </li> */}
                  </ul>
                </div>
            </li>
          </ul>
          )}


          {/* users */}

          {user && user.role === "user" && (
            
            <ul className="menu">
             {/* Allocation */}

             <li className="mb-1">
                <NavLink
                  to="/allocation"
                  activeClassName="active"
                  className="btn btn-toggle align-items-center rounded collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#allocation-collapse"
                  aria-expanded="false"
                  style={{ color: "white", marginLeft:"-20px" }}
                  
                >
                  <span
                    className="text-warning"
                    style={{ fontSize: "20px", }}
                  >
                    <FcApprove />
                  </span>{""} Allocation
                </NavLink>
                <div
                  className="collapse"
                  id="allocation-collapse"
                  style={{ color: "white" }}
                >
                 <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li>
                      <NavLink
                        to="/staffList"
                        className="link rounded"
                        style={{ color: "white", textDecoration: "none" }}
                        onClick={handleAuditStaffs}
                        activeClassName="active"
                      >
                        <span
                          className="text-success"
                          style={{ fontSize: "25px", color: "orangered" }}
                        >
                          <MdPeopleAlt />
                        </span>{" "}
                        Allocation
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/level"
                        className="link rounded"
                        style={{ color: "white", textDecoration: "none" }}
                        onClick={handleAuditStaffs}
                        activeClassName="active"
                      >
                        <span
                          className="text-success"
                          style={{ fontSize: "25px", color: "orangered" }}
                        >
                          <SiLevelsdotfyi />
                        </span>{" "}
                        Level
                      </NavLink>
                    </li>

                    

                    <li>
                      <NavLink
                        to="/department"
                        className="link rounded"
                        style={{ color: "white", textDecoration: "none" }}
                        onClick={handleAuditStaffs}
                        activeClassName="active"
                      >
                        <span
                          className="text-success"
                          style={{ fontSize: "25px", color: "orangered" }}
                        >
                          <FcDepartment />
                        </span>{" "}
                        Department
                      </NavLink>
                    </li>

                

                    
                    <li>
                      <NavLink
                        to="/email"
                        className="link rounded"
                        style={{ color: "white", textDecoration: "none" }}
                        onClick={handleAuditStaffs}
                        activeClassName="active"
                      >
                        <span
                          className="text-success"
                          style={{ fontSize: "25px", color: "orangered" }}
                        >
                          <AiOutlineMail />
                        </span>{" "}
                        Email
                      </NavLink>
                    </li>
                  </ul>
                </div>
            </li>



             {/* Logs */}
             <li className="mb-1">
                <NavLink
                  to="/logs"
                  activeClassName="active"
                  className="btn btn-toggle align-items-center rounded collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#logs-collapse"
                  aria-expanded="false"
                  style={{ color: "white",  marginLeft:"-20px" }}
                >
                  <span
                    className="text-warning"
                    style={{ fontSize: "20px", }}
                  >
                    <MdOutlineLogin />
                  </span>{""} Logs
                </NavLink>
                <div
                  className="collapse"
                  id="logs-collapse"
                  style={{ color: "white" }}
                >
                 <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li>
                      <NavLink
                        to="/dataLog"
                        className="link rounded"
                        style={{ color: "white", textDecoration: "none" }}
                        onClick ={handleAuditDataLogs}
                        activeClassName="active"
                      >
                        <span
                          className="text-success"
                          style={{ fontSize: "25px", color: "orangered" }}
                        >
                          <Md4GPlusMobiledata />
                        </span>{" "}
                        Data Logs
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/voiceLog"
                        className="link rounded"
                        style={{ color: "white", textDecoration: "none" }}
                        onClick = {handleAuditVoiceLogs}
                        activeClassName="active"
                      >
                        <span
                          className="text-success"
                          style={{ fontSize: "25px", color: "orangered" }}
                        >
                          <MdRecordVoiceOver />
                        </span>{" "}
                        Voice Logs
                      </NavLink>
                    </li>
                  </ul>
                </div>
            </li>



              {/* Reports */}
             <li className="mb-1">
                <NavLink
                  to="/logs"
                  activeClassName="active"
                  className="btn btn-toggle align-items-center rounded collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#reports-collapse"
                  aria-expanded="false"
                  style={{ color: "white",  marginLeft:"-20px" }}
                >
                  <span
                    className="text-warning"
                    style={{ fontSize: "20px", }}
                     activeClassName="active"
                  >
                    <TbReportSearch />
                  </span>{""} Report
                </NavLink>
                <div
                  className="collapse"
                  id="reports-collapse"
                  style={{ color: "white" }}
                >
                 <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li>
                      <NavLink
                        to="/voiceReport"
                        className="link rounded"
                        style={{ color: "white", textDecoration: "none" }}
                        onClick = {handleAuditVoiceReport}
                        activeClassName="active"
                      >
                        <span
                          className="text-success"
                          style={{ fontSize: "25px", color: "orangered" }}
                        >
                          <MdOutlineCall />
                        </span>{" "}
                        Voice Report
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/dataReport"
                        className="link rounded"
                        style={{ color: "white", textDecoration: "none" }}
                        onClick = {handleAuditDataReport}
                        activeClassName="active"
                      >
                        <span
                          className="text-success"
                          style={{ fontSize: "25px", color: "orangered" }}
                        >
                          <MdOutlineLtePlusMobiledata />
                        </span>{" "}
                        Data Report
                      </NavLink>
                    </li>
                  </ul>
                </div>
            </li>
          </ul>
          )}
         
         
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
