import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  CRow,
} from "@coreui/react";
import { useSelector } from "react-redux";
import moment from "moment";
import { RiMailAddFill } from "react-icons/ri";
import './Login.css'

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

const ResetPassword = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useSelector((state) => state.auth);

  const SendResetLink = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://172.25.160.235:2402/forgotPassword",
        {
          userEmail: userEmail,
        },
      );

      // On success, set a success message
      setMessage("Password reset link sent successfully");
      navigate("/listUsers");
    } catch (error) {
      if (error.response) {
        // On failure, set an error message
        setMessage(error.response.data.message);
      }
    }
  };

  const handleResetPassword = async () => {
    const actor = user.userName;
    const action = `reset password ${userEmail}`;
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
                      Forget Password
                    </p>
                    <p style={{ color: "red" }}>{message}</p>
                    <input
                      type="email"
                      class="form-control"
                      placeholder="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                  <button type="submit" class="btn signin">
                    <span><RiMailAddFill /></span> {''}Email
                  </button>
                  <div style={{ marginTop: "10px", textAlign: "center" }}>
                  <span>Do you have an account?:</span>
                  <Link to="/" class="forgot-password-link" style={{color:"orange"}}>
                    login
                  </Link>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
