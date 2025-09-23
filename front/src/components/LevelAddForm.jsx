import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { BiArrowBack } from "react-icons/bi";
import {MdSaveAlt } from "react-icons/md";



const LevelAddForm = () => {
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

  // const [selectedLevel, setSelectedLevel] = useState("");
  const [LEVEL, setLEVEL] = useState("");
  const [VOICE, setVOICE] = useState("");
  const [DATA, setDATA] = useState("");
  const [SMS, setSMS] = useState("");
 
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    try {
      await axios.post(
        "http://172.25.160.235:2402/staff_allocation_levelTB",
        {
          LEVEL: LEVEL,
          VOICE: VOICE,
          DATA: DATA,
          SMS: SMS,
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      navigate("/levelDataList");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };




  const handleAuditStaff = async () => {
    const actor = user.userName;
    const action = `Add staff_allocation_levelTB table info ${LEVEL},${VOICE},${DATA},${SMS}`;
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
            <form onSubmit={saveUser}>
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
                Add level info
              </p>
              <p className="has-text-centered" style={{ color: "red" }}>
                {msg}
              </p>

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
                    onClick={handleAuditStaff}
                  >
                    Save
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

export default LevelAddForm;
