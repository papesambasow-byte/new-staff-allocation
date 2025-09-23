import React, { useState, useEffect } from "react";
import axios from "axios";
import "@coreui/coreui/dist/css/coreui.min.css";
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

const LogsVoice = () => {
  const [staff_entitlement_logs_voice, setStaff_entitlement_logs_voice] =
    useState([]);

  useEffect(() => {
    getStaff_entitlement_logs_voice();
  }, []);

  // add staff info api
  // const getStaff_entitlement_logs_voice = async () => {
  //   const response = await axios.get(
  //     "http://172.25.160.235:2402/staff_entitlement_logs_voice"
  //   );
  //   setStaff_entitlement_logs_voice(response.data);
  //   console.log(response);
  // };

  const getStaff_entitlement_logs_voice = async () => {
    const token = localStorage.getItem("token"); 
    const authHeader = `Bearer ${token}`;
    
    try {
      const response = await axios.get("http://172.25.160.235:2402/staff_entitlement_logs_voice", {
        headers: {
          Authorization: authHeader,
        },
      });
      setStaff_entitlement_logs_voice(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //data table
  $("#stsTokenDisplay").DataTable().destroy();
  setTimeout(() => {
    $(document).ready(function () {
      $("#stsTokenDisplay").DataTable({
        pagingType: "full_numbers",
        pageLength: 10,
        destroy: true,
        processing: true,
        // dom: "Bfrtip",
        // buttons: ["copy", "csv", "excel", "pdf", "print"]
      });
    });
  });

  return (
    <div style={{ width: "98%", marginRight: "auto", marginLeft: "auto" }}>
      <p
        className="subtitle"
        style={{ fontWeight: "bold", fontSize: "15PX", paddingTop: "20px" }}
      >
        STAFF MONTHLY VOICE LOGS
      </p>
      <table
        className="table is-striped is-fullwidth"
        id="stsTokenDisplay"
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
            <th>Monthky Remain</th>
            <th>Date Given</th>
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
  );
};

export default LogsVoice;
