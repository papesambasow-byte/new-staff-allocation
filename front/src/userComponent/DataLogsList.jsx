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

const DataLogsList = () => {
  const [staff_entitlement_logs_data, setStaff_entitlement_logs_data] =
    useState([]);

  useEffect(() => {
    getStaff_entitlement_logs_data();
  }, []);


  const getStaff_entitlement_logs_data = async () => {
    const token = localStorage.getItem("token"); 
    const authHeader = `Bearer ${token}`;
    
    try {
      const response = await axios.get("http://172.25.160.235:2402/staff_entitlement_logs_data", {
        headers: {
          Authorization: authHeader,
        },
      });
      setStaff_entitlement_logs_data(response.data);
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
        buttons: ["copy", "csv", "excel", "pdf", "print"],
      });
    });
  });

  return (
    <div style={{ width: "98%", marginRight: "auto", marginLeft: "auto", marginTop:"40px" }}>
      <p
        className="subtitle"
        style={{ fontWeight: "bold", fontSize: "15PX", paddingTop: "20px" }}
      >
        STAFF MONTHLY DATA LOGS
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
            <th>Monthly Data</th>
            <th>Monthly Remain</th>
            <th>SMS</th>
            <th>Date Given</th>
          </tr>
        </thead>
        <tbody>
          {staff_entitlement_logs_data.map(
            (staff_entitlement_logs_data, index) => (
              <tr key={staff_entitlement_logs_data.id}>
                <td>{index + 1}</td>
                <td>{staff_entitlement_logs_data.MSISDN}</td>
                <td>{staff_entitlement_logs_data.NORMAL_DATA_in_GB}</td>
                <td>{staff_entitlement_logs_data.FLOAT_DATA_in_GB}</td>
                <td>{staff_entitlement_logs_data.SMS}</td>
                <td>{staff_entitlement_logs_data.DATE_AWARDED}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataLogsList;
