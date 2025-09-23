import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import { useSelector } from "react-redux";
import moment from "moment";
import { useParams } from "react-router-dom";
import { RiMailAddFill } from "react-icons/ri";
import './Login.css'
import { FaEye, FaEyeSlash } from "react-icons/fa";


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

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [userPassword, setUserPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [message, setMessage] = useState("");
  const { token } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleTogglePassword1 = () => {
    setShowPassword1(!showPassword1);
  };


  const SendResetLink = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://172.25.160.235:2402/reset-password/${token}`,
        {
          userPassword,
          confPassword,
        });

      // On success, set a success message and navigate
      setMessage("Password reset successfully");
      navigate("/");
    } catch (error) {
      if (error.response) {
        // On failure, set an error message
        setMessage(error.response.data.message);
      }
    }
  };

  const handleResetPassword = async () => {
    const actor = user.userName;
    const action = `reset password`;
    const performedDate = today;
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    await axios
      .post(
        "http://172.25.160.235:2402/auditTrail",
        {
          actor,
          action,
          performedDate,
        },
        {
          headers: {
            Authorization: authHeader,
          },
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
    <>
      <div class="form-bg">
        <div class="container">
          <div class="row">
            <div class="col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6">
              <div class="form-container">
                <form class="form-horizontal" onSubmit={SendResetLink}>
                  <div class="form-icon">
                    <i class="fa fa-user-circle"></i>
                  </div>
                  <div class="form-group">
                    <span class="input-icon">
                      <i class="fa fa-user"></i>
                    </span>
                    <p
                      class="title"
                      style={{
                        color: "black",
                        fontSize: "15",
                        fontWeight: "bold",
                      }}
                    >
                      Staff Allocation
                    </p>
                    <p
                      style={{
                        color: "gray",
                        fontSize: "5",
                        
                      }}
                    >
                      Reset Password
                    </p>
                    <p style={{ color: "red" }}>{message}</p>
                  </div>
                  <div class="form-group">
                    <CInputGroup className="mb-4">
                      <CFormInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="************"
                        autoComplete="current-password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                      />
                      <CInputGroupText onClick={handleTogglePassword} style={{marginBottom:"5px"}}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </CInputGroupText>
                    </CInputGroup>
                  </div>
                  <div class="form-group">
                    <CInputGroup className="mb-4">
                      <CFormInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="************"
                        autoComplete="current-password"
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                      />
                      <CInputGroupText onClick={handleTogglePassword1} style={{marginBottom:"5px"}}>
                        {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                      </CInputGroupText>
                    </CInputGroup>
                  </div>
                  <button type="submit" class="btn signin">
                    Reset
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
