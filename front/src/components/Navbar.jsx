import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../orange_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import { FaBars } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import "./Nav.css";
import { MdOutlinePassword, MdSupervisorAccount } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";

const Navbar = ({ onSidebarToggle, isSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        background: "orange",
        zIndex: 1,
        transition: "height 0.3s",
      }}
    >
      <nav
        className={`navbar is-fixed-top ${isSidebarOpen ? "" : "short-navbar"}`}
        role="navigation"
        aria-label="main navigation"
        style={{ background: "#192655" }}
      >
        <div
          className="navbar-item"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <button
            onClick={onSidebarToggle}
            className="button is-light"
            style={{ marginLeft: "250px" }}
          >
            <FaBars />
          </button>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button
                  onClick={logout}
                  className="button is-info"
                  style={{ height: "5vh" }}
                >
                   <strong>{user && user.userName}</strong>
                  <span className="text-danger" style={{ fontSize: "20px", marginLeft:"15px" }}>
                    <AiOutlineLogout  />
                  </span>
                </button>
              </div>
              {/* <div className="mb-2" style={{background:"grey"}}>
                <NavLink
                  to="/accounts"
                  activeClassName="active"
                  className="btn btn-toggle align-items-center rounded collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#accounts-collapse"
                  aria-expanded="false"
                  style={{ color: "black", background:"white", }}
                >
                  <span
                    className="text-dark"
                    style={{ fontSize: "20px", }}
                  >
                    <strong>{user && user.userName}</strong><BsPersonCircle />
                  </span>
                </NavLink>
                <div
                  className="collapse"
                  id="accounts-collapse"
                  style={{ color: "black" }}
                >
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small" style={{textDecoration:"none", }}>
                   
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
