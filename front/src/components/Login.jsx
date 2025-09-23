import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CFormInput, CInputGroupText, CInputGroup } from "@coreui/react";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess, message, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user || isSuccess) {
      navigate('/dashboard')
    }
    dispatch(reset());
  }, [isSuccess, user, dispatch, navigate, token]);

  const Auth = async (e) => {
    e.preventDefault();
    await dispatch(LoginUser({ userEmail, userPassword }));
  };


  return (
    <div class="form-bg">
      <div class="container">
        <div class="row">
          <div class="col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6">
            <div class="form-container">
              <form class="form-horizontal" onSubmit={Auth}>
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
                    class="title"
                    style={{
                      color: "black",
                      fontSize: "15",
                      fontWeight: "bold",
                    }}
                  >
                    Login
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
                <div class="form-group">
                  <CInputGroup className="mb-4">
                    <CFormInput
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                      autoComplete="current-password"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                    />
                    <CInputGroupText onClick={handleTogglePassword} style={{ marginBottom: "5px" }}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </CInputGroupText>
                  </CInputGroup>
                </div>
                <button type="submit" class="btn signin">
                  Login
                </button>
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                  <Link to="/forget_password" class="forgot-password-link" style={{color:"orange"}}>
                    Forgot Password?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
