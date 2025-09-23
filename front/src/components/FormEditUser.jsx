import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CCol,
  CButton,
  CForm,
  CContainer,
  CRow,
  CFormInput,
  CFormSelect,
  CInputGroupText,
  CInputGroup
} from '@coreui/react'
import moment from "moment";
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { BiArrowBack } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";

const FormEditUser = () => {

  const { user } = useSelector((state) => state.auth);
  const updatedBy = user && user.userName
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  // const [userPassword, setUserPassword] = useState("");
  // const [confPassword, setConfPassword] = useState("");
  const [UpdatedBy, setUpdatedBy] = useState(`${updatedBy}`);
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const [showPassword, setShowPassword] = useState(false)
  const [showConfPassword, setShowConfPassword] = useState(false)
  const handleTogglePassword = () => {
      setShowPassword(!showPassword)
    }
  
  const handleToggleConfPassword = () => {
      setShowConfPassword(!showConfPassword)
    }
 



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

  useEffect(() => {
    const getUserById = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get(
          `http://172.25.160.235:2402/users/${id}`,
          config
        );

        setUserName(response.data.userName);
        setUserPhone(response.data.userPhone);
        setUserEmail(response.data.userEmail);
        // setUserPassword(response.data.userPassword);
        // setConfPassword(response.data.confPassword);
        setRole(response.data.role);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    e.preventDefault();
    try {
      await axios.patch(
        `http://172.25.160.235:2402/users/${id}`,
        {
          userName: userName,
          userPhone: userPhone,
          userEmail: userEmail,
          // userPassword: userPassword,
          // confPassword: confPassword,
          role: role,
          UpdatedBy:UpdatedBy
        },
        {
          headers: {
            Authorization: authHeader
          }
        }
      );
      navigate("/listUsers");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const handleAuditEdit = async () => {
    const actor = user.userName;
    const action = `Edit User ${userName}`;
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
          Authorization: authHeader
        }
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div
        className="card is-shadowless"
        style={{
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "30px"
        }}
      >
        <div
          className="card-content"
          style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
        >
          <div className="content">
            <form onSubmit={updateUser}>
              <Link
                to="/listUsers"
                className="button  mb-2 bg-danger"
                style={{
                  background: "black",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "15PX",
                  fontWeight: "bold"
                }}
              >
                <span><BiArrowBack/></span>
              </Link>
              <p
                className="subtitle text-center"
                style={{ fontSize: "15px", fontWeight: "bold" }}
              >
                EDIT USER
              </p>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  Name
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  MSISDN
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="23276111111"
                  />
                </div>
              </div>
              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  Email
                </label>
                <div className="control">
                  <input
                    type="email"
                    className="input"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="sample@gmail.com"
                  />
                </div>
              </div>
              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  Role
                </label>
                <div className="control">
                  <select
                    type="text"
                    class="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option>SELECT OPTION</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>

              <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                  hidden
                >
                  UpdatedBy
                </label>

                <CInputGroup className="mb-4" hidden>
                  <CFormInput
                    id="confPassword"
                    type= "text"
                    className="input"
                    value={updatedBy}
                    onChange={(e) => setUpdatedBy(e.target.value)}
                    placeholder="updated by"
                    aria-describedby="exampleFormControlInputHelpInline"
                  />
                </CInputGroup>
              

              <div className="field">
                <div className="control">
                  <button
                    type="submit"
                    className="button bg-success"
                    style={{
                      background: "black",
                      color: "white",
                      fontSize: "15PX",
                      fontWeight: "bold"
                    }}
                    onClick={handleAuditEdit}
                  >
                    <span><FaUserEdit/></span> {''} Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditUser;
