import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { BiArrowBack, BiEdit } from "react-icons/bi";
// import {MdEditAttributes} from "react-icons/md";



const FormEditStaff = () => {
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


  const [staff_allocation_levelTB, setStaff_allocation_levelTB] = useState([]);
  const [department, setDepartment] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [NAMES, setNAMES] = useState("");
  const [DEPARTMENT, setDEPARTMENT] = useState("");
  const [ENTITY, setENTITY] = useState("");
  const [MSISDN, setMSISDN] = useState("");
  const [LEVEL, setLEVEL] = useState("");
  const [VOICE, setVOICE] = useState("");
  const [DATA, setDATA] = useState("");
  const [SMS, setSMS] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDepartmentChange = (e) => {
    setDEPARTMENT(e.target.value);
    setENTITY(e.target.value); 
  };

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
          `http://172.25.160.235:2402/staffEntitlement_tb/${id}`, config
        );
        setNAMES(response.data.NAMES);
        setDEPARTMENT(response.data.DEPARTMENT);
        setENTITY(response.data.ENTITY);
        setMSISDN(response.data.MSISDN);
        setLEVEL(response.data.LEVEL);
        setVOICE(response.data.VOICE);
        setDATA(response.data.DATA);
        setSMS(response.data.SMS);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);



  const handleLevelChange = (event) => {
    const selectedLevelName = event.target.value;

    // Check if the selected value is not empty before updating the state.
    if (selectedLevelName === "") {
      console.log("Please select a valid level.");
      return;
    }

    setSelectedLevel(selectedLevelName);

    const selectedLevel = staff_allocation_levelTB.find(
      (level) => level.LEVEL === selectedLevelName
    );

    if (selectedLevel) {
      setVOICE(selectedLevel.VOICE || "");
      setDATA(selectedLevel.DATA || "");
      setSMS(selectedLevel.SMS || "");
      setLEVEL(selectedLevel.LEVEL);
    } else {
      console.log("Selected Level Not Found");
    }
  };



// department
  useEffect(() => {
    getDepartment();
  }, []);

  const getDepartment = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get(
        "http://172.25.160.235:2402/department",
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      setDepartment(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };





  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const authHeader = `Bearer ${token}`;
      
      axios.get("http://172.25.160.235:2402/staff_allocation_levelTB", {
        headers: {
          Authorization: authHeader
        }
      })
      .then((response) => {
        setStaff_allocation_levelTB(response.data);
      })
      .catch((error) => {
        console.error("Error fetching levels:", error);
      });
    } else {
      console.error("No token found. User not authenticated.");
    }
  }, []);
  



  const updateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    try {
      await axios.patch(`http://172.25.160.235:2402/staffEntitlement_tb/${id}`, {
        NAMES: NAMES,
        DEPARTMENT: DEPARTMENT,
        ENTITY: ENTITY,
        MSISDN: MSISDN,
        LEVEL: LEVEL,
        VOICE: VOICE,
        DATA: DATA,
        SMS: SMS,
      },{
        headers: {
          Authorization: authHeader
        }
      });
      navigate("/staffAllocation");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };



  const handleAuditEditStaff = async () => {
    const actor = user.userName;
    const action = `Edit staff info ${MSISDN}`;
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
          marginTop: "30px",
        }}
      >
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateUser}>
              <Link
                to="/staffAllocation"
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
                EDIT STAFF
              </p>
              <p className="has-text-centered">{msg}</p>

              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  NAME
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={NAMES}
                    onChange={(e) => setNAMES(e.target.value)}
                    placeholder="enter staff name"
                  />
                </div>
              </div>

              <div className="field">
                <label
                  className="label form-control-sm"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  DEPARTMENT
                </label>
                <div className="control">
                  <select
                    className="input form-control-sm"
                    value={DEPARTMENT}
                    onChange={handleDepartmentChange}
                  >
                    <option value="">Select Department</option>
                    {department.map((department) => (
                      <option key={department.id} value={department.deptName}>
                        {department.deptName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  ENTITY
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={ENTITY}
                    onChange={(e) => setENTITY(e.target.value)}
                    placeholder="gsm"
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
                    value={MSISDN}
                    onChange={(e) => setMSISDN(e.target.value)}
                    placeholder="76111111"
                  />
                </div>
              </div>

{/* 
              <div className="field">
                <label
                  className="label form-control-sm"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  LEVEL
                </label>
                <div className="control">
                  <select
                    className="input form-control-sm"
                    value={staffAllocationLevelTBId}
                    onChange={(e) => setStaffAllocationLevelTBId(e.target.value)}
                  >
                    <option value="">Select Level</option>
                    {staff_allocation_levelTB.map((staff_allocation_levelTB, index) => (
                      <option key={staff_allocation_levelTB.id} value={staff_allocation_levelTB.id}>
                        {staff_allocation_levelTB.LEVEL}
                      </option>
                    ))}
                  </select>
                </div>
              </div> */}
              
              <div className="field">
                <label
                  className="label form-control-sm"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  LEVEL
                </label>
                <div className="control">
                  <select
                    className="input form-control-sm"
                    value={selectedLevel}
                    onChange={handleLevelChange}
                  >
                    <option value="">Select Level</option>
                    {staff_allocation_levelTB.map((level) => (
                      <option key={level.id} value={level.LEVEL}>
                        {level.LEVEL}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  VOICE
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={VOICE}
                    onChange={(e) => setVOICE(e.target.value)}
                    placeholder="VOICE"
                  />
                </div>
              </div>

              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  DATA
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={DATA}
                    onChange={(e) => setDATA(e.target.value)}
                    placeholder="DATA"
                  />
                </div>
              </div>

              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  SMS
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={SMS}
                    onChange={(e) => setSMS(e.target.value)}
                    placeholder="SMS"
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

export default FormEditStaff;
