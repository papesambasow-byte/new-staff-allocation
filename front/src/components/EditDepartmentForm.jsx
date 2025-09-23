import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { BiArrowBack, BiEdit } from "react-icons/bi";




const EditDepartmentForm = () => {
  const { user } = useSelector((state) => state.auth);

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
  const updatedBy = user && user.userName
  const [deptName, setDeptName] = useState("");
  const [UpdatedBy, setUpdatedBy] = useState(`${updatedBy}`);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    const getUserById = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      try {
        const response = await axios.get(
          `http://172.25.160.235:2402/department/${id}`, config
        );
        setDeptName(response.data.deptName);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);



  const updateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    try {
      await axios.patch(`http://172.25.160.235:2402/department/${id}`, {
        deptName: deptName,
        UpdatedBy:UpdatedBy
      },{
        headers: {
          Authorization: authHeader
        }
      });
      navigate("/listDepartment");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };



  const handleAuditEditStaff = async () => {
    const actor = user.userName;
    const action = `Edit department  ${deptName} `;
    const performedDate = today;
    const token = localStorage.getItem("token")
    const authHeader = `Bearer ${token}`

    await axios
      .post("http://172.25.160.235:2402/auditTrail", {
        actor,
        action,
        performedDate,
      },
      {
        headers :{
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
      <div
        className="card is-shadowless"
        style={{
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "70px",
        }}
      >
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateUser}>
              <Link
                to="/listDepartment"
                className="button  mb-2 bg-danger"
                style={{
                  background: "black",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "15PX",
                  fontWeight: "bold",
                }}
              >
                 <span><BiArrowBack/></span>
              </Link>
              <p
                className="subtitle text-center"
                style={{ fontSize: "15px", fontWeight: "bold" }}
              >
                EDIT DEPARTMENT
              </p>
              <p className="has-text-centered">{msg}</p>

              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  Department
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={deptName}
                    onChange={(e) => setDeptName(e.target.value)}
                    placeholder="edit department"
                  />
                </div>
              </div>

              <div className="field" hidden>
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  Updated BY
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={updatedBy}
                    onChange={(e) => setUpdatedBy(e.target.value)}
                    placeholder="created by"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button
                    type="submit"
                    className="button bg-success"
                    style={{
                      background: "black",
                      color: "white",
                      fontSize: "15PX",
                      fontWeight: "bold",
                    }}
                    onClick={handleAuditEditStaff}
                  >
                    <span ><BiEdit/></span> Save
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

export default EditDepartmentForm;
