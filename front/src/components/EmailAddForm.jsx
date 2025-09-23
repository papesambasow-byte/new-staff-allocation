import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { BiArrowBack } from "react-icons/bi";
import {MdSaveAlt } from "react-icons/md";



const EmailAddForm = () => {
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

  const createdBy = user && user.userName
  const [recipientEmail, setRecipientEmail] = useState("");
  const [RecieverName, setRecieverName] = useState("");
  const [CreatedBy, setCreatedBy] = useState(`${createdBy}`);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();



  const saveUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    try {
      await axios.post(
        "http://172.25.160.235:2402/emailNotification",
        {
            recipientEmail: recipientEmail,
            RecieverName: RecieverName,
            CreatedBy:CreatedBy
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      navigate("/listEmail");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  
  const handleAuditStaff = async () => {
    const actor = user.userName;
    const action = `Add an email info: ${recipientEmail} ${RecieverName}`;
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
                to="/listEmail"
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
                ADD NEW STAFF
              </p>
              <p className="has-text-centered" style={{ color: "red" }}>
                {msg}
              </p>
              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  Email
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input form-control-sm"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="enter an email like: sample.orange-sonatel.com"
                  />
                </div>
              </div>

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
                    className="input form-control-sm"
                    value={RecieverName}
                    onChange={(e) => setRecieverName(e.target.value)}
                    placeholder="input a name of the above email"
                  />
                </div>
              </div>

              <div className="field" hidden>
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  Created BY
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={createdBy}
                    onChange={(e) => setCreatedBy(e.target.value)}
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

export default EmailAddForm;
