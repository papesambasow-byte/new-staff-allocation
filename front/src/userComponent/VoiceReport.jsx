import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import {MdContentPasteSearch} from "react-icons/md";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import "datatables.net-buttons/js/buttons.flash.min.js";
import * as jzip from "jszip";
import "pdfmake";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
window.JSZip = jzip;



const VoiceReport = () => {
  const [staff_entitlement_logs_voice, setStaff_entitlement_logs_voice] =
    useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

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



  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); 
  
    try {
      const response = await axios.post(
        "http://172.25.160.235:2402/staff_entitlement_logs_voice",
        {
          startDate: startDate,
          endDate: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data) {
        setStaff_entitlement_logs_voice(response.data);
      } else {
        console.error("Response data is empty.");
      }
  
      $("#records").DataTable().destroy();
      setTimeout(() => {
        $(document).ready(function () {
          $("#records").DataTable({
            pagingType: "full_numbers",
            pageLength: 5,
            destroy: true,
            processing: true,
            dom: "Bfrtip",
            buttons: ["copy", "csv", "excel", "pdf", "print"],
          });
        });
      });
    } catch (error) {
      console.error("Error in submitting data:", error);
      // Handle the error as needed
    }
  };
  

  const handleAuditReportVoice = async () => {
    const actor = user.userName;
    const action = `Monthly voice report ${startDate} & ${endDate}`;
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
        headers:{
          Authorization:authHeader
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
    <div style={{ zIndex: -1 }}>
      <div
        className="card is-shadowless"
        style={{
          width: "40%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "30px",
         
          
        }}
      >
        <div className="card-content" style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",}}>
          <div className="content">
            <form onSubmit={handleSubmit}>
              <p
                className="subtitle"
                style={{ fontSize: "15px", fontWeight: "bold" }}
              >
                SEARCH MONTHLY VOICE
              </p>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  START DATE
                </label>
                <div className="control">
                  <input
                    type="dateTime-local"
                    className="input"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  END DATE
                </label>
                <div className="control">
                  <input
                    type="dateTime-local"
                    className="input"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="LEVEL"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button
                    type="submit"
                    className="button bg-success"
                    style={{
                      color: "white",
                      fontSize: "15PX",
                      fontWeight: "bold",
                    }}
                    onClick={handleAuditReportVoice}
                  >
                    <span><MdContentPasteSearch/></span> Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div style={{ width: "98%", marginRight: "auto", marginLeft: "auto" }}>
        <p
          className="subtitle"
          style={{ paddingTop: "30px", fontSize: "15px", fontWeight: "bold" }}
        >
          LIST OF MONTHLY VOICE REPORT
        </p>
        <table
          className="table is-striped is-fullwidth"
          id="records"
          style={{
            fontSize: "15PX",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <thead>
            <tr>
              <th>No</th>
              <th>MSISDN</th>
              <th>Monthly Voice</th>
              <th>Voice Reamian</th>
              <th>DATE</th>
            </tr>
          </thead>
          <tbody>
            {staff_entitlement_logs_voice.map(
              (staff_entitlement_logs_voice, index) => (
                <tr key={staff_entitlement_logs_voice.id}>
                  <td>{index + 1}</td>
                  <td>{staff_entitlement_logs_voice.MSISDN}</td>
                  <td>{staff_entitlement_logs_voice.NORMAL_VOICE_in_Leones}</td>
                  <td>{staff_entitlement_logs_voice.FLOAT_VOICE_in_leones}</td>
                  <td>{staff_entitlement_logs_voice.DATE_AWARDED}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoiceReport;
