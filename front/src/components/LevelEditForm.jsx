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


  const [LEVEL, setLEVEL] = useState("");
  const [VOICE, setVOICE] = useState("");
  const [DATA, setDATA] = useState("");
  const [SMS, setSMS] = useState("");
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
          `http://172.25.160.235:2402/staff_allocation_levelTB/${id}`, config
        );
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



  const updateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    try {
      await axios.patch(`http://172.25.160.235:2402/staff_allocation_levelTB/${id}`, {
        LEVEL: LEVEL,
        VOICE: VOICE,
        DATA: DATA,
        SMS: SMS,
      },{
        headers: {
          Authorization: authHeader
        }
      });
      navigate("/levelDataList");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };



  const handleAuditEditStaff = async () => {
    const actor = user.userName;
    const action = `Edit staff_allocation_levelTB table info ${LEVEL},${VOICE},${DATA},${SMS}`;
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
                to="/levelDataList"
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
                Edit Level info
              </p>
              <p className="has-text-centered">{msg}</p>

              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  LEVEL
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input form-control-sm"
                    value={LEVEL}
                    onChange={(e) => setLEVEL(e.target.value)}
                    placeholder="enter level like this Manager or AssistantManager or deputyDirector"
                  />
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
                    className="input form-control-sm"
                    value={VOICE}
                    onChange={(e) => setVOICE(e.target.value)}
                    placeholder="enter voice like 900 or 300"
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
                    className="input form-control-sm"
                    value={DATA}
                    onChange={(e) => setDATA(e.target.value)}
                    placeholder="enter data like 50 or 100"
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
                    className="input form-control-sm"
                    value={SMS}
                    onChange={(e) => setSMS(e.target.value)}
                    placeholder="enter sms like 300"
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
                    <span ><BiEdit/></span>Save
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
